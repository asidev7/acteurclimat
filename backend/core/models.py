# core/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.mail import send_mail, EmailMessage
from django.utils.translation import gettext_lazy as _
from django.template.loader import render_to_string
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import Group, Permission
from django.conf import settings
from django.utils import timezone
from dateutil.relativedelta import relativedelta
import uuid
# Garder votre CustomUserManager existant
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Crée et enregistre un utilisateur avec l'email et le mot de passe fournis.
        """
        if not email:
            raise ValueError(_('L\'email est obligatoire'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_active = False  # L'utilisateur doit confirmer son email
        user.save(using=self._db)
        user.send_verification_email()  # Envoyer l'e-mail de vérification
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Crée et enregistre un superutilisateur avec l'email et le mot de passe fournis.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)  # Les superutilisateurs sont automatiquement activés
        return self.create_user(email, password, **extra_fields)

# Garder votre modèle User existant avec quelques ajouts
class User(AbstractBaseUser, PermissionsMixin):
    """
    Modèle utilisateur personnalisé utilisant l'email comme identifiant principal.
    """
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Nouveaux champs pour le projet de prédiction de football
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    coins = models.IntegerField(default=0)  # Système de coins/crédits
    
    # Relations ManyToMany avec les groupes et les permissions
    groups = models.ManyToManyField(Group, related_name="custom_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True)
    verification_token = models.CharField(max_length=255, blank=True, null=True, unique=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def send_verification_email(self):
        """
        Envoie un email de vérification à l'utilisateur pour activer son compte.
        """
        from django.conf import settings
        from rest_framework_simplejwt.tokens import RefreshToken

        # Générer un token JWT pour l'utilisateur
        refresh = RefreshToken.for_user(self)
        token = str(refresh.access_token)

        # Stocker le token dans la base de données
        self.verification_token = token
        self.save(update_fields=['verification_token'])

        # Créer le lien de vérification
        verification_link = f"{settings.FRONTEND_URL}/api/auth/verify-email?token={token}"

        # Rendre le template HTML
        email_body = render_to_string('email/verification_email.html', {
            'verification_link': verification_link,
            'user': self,
        })

        # Envoyer l'email
        email = EmailMessage(
            'Vérification de votre email',
            email_body,
            settings.DEFAULT_FROM_EMAIL,
            [self.email],
        )
        email.content_subtype = "html"
        email.send(fail_silently=False)
        
# Garder votre modèle SubscriptionPlan existant avec des ajouts
class SubscriptionPlan(models.Model):
    BASIC = 'basic'
    PREMIUM = 'premium'
    VIP = 'vip'
    
    PLAN_TYPES = [
        (BASIC, 'Basic'),
        (PREMIUM, 'Premium'),
        (VIP, 'VIP'),
    ]
    
    name = models.CharField(max_length=100)
    plan_type = models.CharField(max_length=10, choices=PLAN_TYPES, default=BASIC)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    duration_days = models.IntegerField(default=30)
    description = models.TextField()
    features = models.JSONField(default=dict)  # Stocke les fonctionnalités sous forme JSON
    is_active = models.BooleanField(default=True)  # Champ booléen correct

    def __str__(self):
        return self.name

class UserSubscription(models.Model):
    PENDING = 'pending'
    ACTIVE = 'active'
    CANCELED = 'canceled'
    
    STATUS_CHOICES = [
        (PENDING, 'En attente'),
        (ACTIVE, 'Actif'),
        (CANCELED, 'Annulé'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plan = models.ForeignKey('SubscriptionPlan', on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=PENDING,
    )
    reference_id = models.CharField(max_length=50, unique=True)
    transaction_id = models.CharField(max_length=50, null=True, blank=True)
    invoice_token = models.CharField(max_length=50, null=True, blank=True)
    
    start_date = models.DateTimeField(auto_now_add=True)  # Date de début de l'abonnement
    end_date = models.DateTimeField(null=True, blank=True)  # Date de fin, mise à jour lors de l'annulation
    is_active = models.BooleanField(default=True)  # Indique si l'abonnement est actif
    auto_renew = models.BooleanField(default=False)  # Permet le renouvellement automatique

    def activate(self):
        """Mettre à jour l'abonnement pour le marquer comme actif."""
        self.status = self.ACTIVE
        self.save()

    def cancel(self):
        """Annuler l'abonnement et enregistrer la date de fin."""
        self.status = self.CANCELED
        self.end_date = timezone.now()  # Enregistre la date de fin lors de l'annulation
        self.save()

    def __str__(self):
        return f'{self.user.username} - {self.plan.name} ({self.status})'
    
    
class Transaction(models.Model):
    PENDING = 'pending'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    FAILED = 'failed'
    
    STATUS_CHOICES = [
        (PENDING, 'En attente'),
        (COMPLETED, 'Complété'),
        (CANCELLED, 'Annulé'),
        (FAILED, 'Échoué'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subscription = models.ForeignKey(UserSubscription, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    invoice_token = models.CharField(max_length=100, unique=True)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    payment_method = models.CharField(max_length=50, blank=True)  # MTN, MOOV, CARD, etc.
    payment_phone = models.CharField(max_length=20, blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    payment_details = models.JSONField(default=dict, blank=True)  # Pour stocker la réponse complète de PayDunya
    
    def __str__(self):
        return f"{self.user.username} - {self.amount} - {self.status}"



class Bookmaker(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='bookmaker_logos/', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class DailyCoupon(models.Model):
    date = models.DateField(default=timezone.now)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='coupons/', blank=True, null=True)
    bookmaker = models.ForeignKey(Bookmaker, on_delete=models.SET_NULL, null=True, blank=True)
    odds_value = models.FloatField(default=1.0)  # Cote totale du coupon
    risk_level = models.CharField(max_length=20, choices=[
        ('low', 'Faible'),
        ('medium', 'Moyen'),
        ('high', 'Élevé')
    ])
    required_plan = models.CharField(max_length=10, choices=SubscriptionPlan.PLAN_TYPES, default=SubscriptionPlan.BASIC)
    is_validated = models.BooleanField(null=True, blank=True)  # Résultat final du coupon
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_coupons')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Coupon du {self.date.strftime('%d/%m/%Y')} - {self.title}"

class CouponSelection(models.Model):
    coupon = models.ForeignKey(DailyCoupon, on_delete=models.CASCADE, related_name='selections')
    match_description = models.CharField(max_length=200)  # "Équipe A vs Équipe B"
    competition = models.CharField(max_length=100)  # "Ligue 1, Premier League, etc."
    match_date = models.DateTimeField()
    prediction_type = models.CharField(max_length=50, choices=[
        ('1', 'Victoire domicile'),
        ('X', 'Match nul'),
        ('2', 'Victoire extérieur'),
        ('1X', 'Domicile ou nul'),
        ('X2', 'Nul ou extérieur'),
        ('12', 'Domicile ou extérieur'),
        ('over_2_5', 'Plus de 2.5 buts'),
        ('under_2_5', 'Moins de 2.5 buts'),
        ('btts_yes', 'Les deux équipes marquent'),
        ('btts_no', 'Les deux équipes ne marquent pas'),
    ])
    odds_value = models.FloatField()
    is_won = models.BooleanField(null=True, blank=True)  # Null si en attente, True/False une fois déterminé
    
    def __str__(self):
        return f"{self.match_description} - {self.prediction_type} @ {self.odds_value}"

class UserStats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='stats')
    total_coupons_followed = models.IntegerField(default=0)
    winning_coupons = models.IntegerField(default=0)
    losing_coupons = models.IntegerField(default=0)
    total_profit = models.FloatField(default=0)
    success_rate = models.FloatField(default=0)  # Pourcentage
    
    def __str__(self):
        return f"Stats de {self.user.email}"

class UserPreferences(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')
    receive_notifications = models.BooleanField(default=True)
    notification_time = models.TimeField(default=timezone.now)
    favorite_bookmakers = models.ManyToManyField(Bookmaker, blank=True)
    risk_preference = models.CharField(max_length=20, choices=[
        ('low', 'Faible'),
        ('medium', 'Moyen'),
        ('high', 'Élevé')
    ], default='medium')
    
    def __str__(self):
        return f"Préférences de {self.user.email}"

class UserCouponHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='coupon_history')
    coupon = models.ForeignKey(DailyCoupon, on_delete=models.CASCADE)
    stake = models.FloatField(default=0)  # Mise
    potential_winnings = models.FloatField(default=0)
    followed_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.email} - {self.coupon.title}"

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=100)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} - {self.user.email}"

class Transaction(models.Model):
    SUBSCRIPTION = 'subscription'
    COINS = 'coins'
    
    TRANSACTION_TYPES = [
        (SUBSCRIPTION, 'Abonnement'),
        (COINS, 'Achat de coins'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=200)
    reference_id = models.CharField(max_length=100, blank=True, null=True)  # ID de référence pour le paiement externe
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.transaction_type} - {self.user.email} - {self.amount}FCFA"