from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import datetime
from django.conf import settings
from django.utils import timezone
import datetime


class SubscriptionPlan(models.Model):
    """Modèle pour les plans d'abonnement disponibles"""
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    duration_in_days = models.IntegerField(default=30)  # 1 mois par défaut
    
    # Stockage des fonctionnalités sous forme de liste en JSON
    features = models.JSONField(default=list)
    
    class Meta:
        verbose_name = "Plan d'abonnement"
        verbose_name_plural = "Plans d'abonnement"
    
    def __str__(self):
        return f"{self.name} - {self.price}€/mois"

class Subscription(models.Model):
    """Modèle pour les abonnements des utilisateurs"""
    STATUS_CHOICES = (
        ('active', 'Actif'),
        ('expired', 'Expiré'),
        ('cancelled', 'Annulé'),
        ('pending', 'En attente'),
    )
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='subscriptions'
    )    
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.PROTECT)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Abonnement"
        verbose_name_plural = "Abonnements"
    
    def __str__(self):
        return f"Abonnement de {self.user.email} - {self.plan.name}"
    
    def save(self, *args, **kwargs):
        # Si c'est un nouvel abonnement, définir la date de fin
        if not self.pk and not self.end_date:
            self.end_date = self.start_date + datetime.timedelta(days=self.plan.duration_in_days)
        super().save(*args, **kwargs)
    
    def is_expired(self):
        """Vérifie si l'abonnement est expiré"""
        return timezone.now() > self.end_date
    
    def renew(self):
        """Renouvelle l'abonnement pour une période supplémentaire"""
        self.start_date = timezone.now()
        self.end_date = self.start_date + datetime.timedelta(days=self.plan.duration_in_days)
        self.status = 'active'
        self.save()
        return self
    
    def cancel(self):
        """Annule l'abonnement"""
        self.status = 'cancelled'
        self.save()
        return self
    
    def change_plan(self, new_plan):
        """Change le plan d'abonnement"""
        self.plan = new_plan
        # Date de fin calculée à partir de la date de début existante + la durée du nouveau plan
        self.end_date = self.start_date + datetime.timedelta(days=new_plan.duration_in_days)
        self.save()
        return self
    

class Prediction(models.Model):
    user = models.ForeignKey( settings.AUTH_USER_MODEL,  on_delete=models.CASCADE, related_name='predictions')
    match_id = models.CharField(max_length=50)  # ID du match
    team1 = models.CharField(max_length=100)    # Équipe 1
    team2 = models.CharField(max_length=100)    # Équipe 2
    prediction_option = models.CharField(max_length=100)  # Option de prédiction (ex: "Victoire de l'équipe 1")
    confidence = models.FloatField()            # Pourcentage de confiance
    tips = models.TextField(blank=True, null=True)  # Conseils ou raisonnement
    created_at = models.DateTimeField(auto_now_add=True)  # Date de création

    def __str__(self):
        return f"{self.user.email} - {self.team1} vs {self.team2}"


class Customer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="customer")  # Lien vers l'utilisateur personnalisé
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Transaction(models.Model):
    transaction_id = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    amount = models.IntegerField()  # Montant en centimes
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="transactions")
    payment_url = models.URLField(blank=True, null=True)
    token = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"Transaction {self.transaction_id} for {self.customer.email}"
