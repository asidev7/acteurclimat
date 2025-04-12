from django.db import models

# Create your models here.
# models.py

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class User(AbstractUser):
    """Modèle utilisateur étendu"""
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    is_organization = models.BooleanField(default=False)
    organization_name = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)
    
    class Meta:
        verbose_name = _('utilisateur')
        verbose_name_plural = _('utilisateurs')


class Category(models.Model):
    """Catégories pour les initiatives climatiques"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text="Nom de l'icône Font Awesome")
    
    class Meta:
        verbose_name = _('catégorie')
        verbose_name_plural = _('catégories')
        
    def __str__(self):
        return self.name


class Region(models.Model):
    """Régions géographiques"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name = _('région')
        verbose_name_plural = _('régions')
        
    def __str__(self):
        return self.name


class ClimateInitiative(models.Model):
    """Initiatives ou projets climatiques"""
    STATUS_CHOICES = [
        ('draft', _('Brouillon')),
        ('active', _('Actif')),
        ('completed', _('Terminé')),
        ('suspended', _('Suspendu')),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=255)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='initiatives')
    categories = models.ManyToManyField(Category, related_name='initiatives')
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, related_name='initiatives')
    
    # Localisation
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    
    # Dates
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    
    # Statut et visibilité
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    is_public = models.BooleanField(default=True)
    
    # Contenu media
    featured_image = models.ImageField(upload_to='initiatives/', null=True, blank=True)
    
    class Meta:
        verbose_name = _('initiative climatique')
        verbose_name_plural = _('initiatives climatiques')
        
    def __str__(self):
        return self.title
    
    @property
    def average_rating(self):
        reviews = self.reviews.all()
        if not reviews:
            return 0
        return sum(review.rating for review in reviews) / len(reviews)


class InitiativeMedia(models.Model):
    """Médias liés à une initiative"""
    MEDIA_TYPE_CHOICES = [
        ('image', _('Image')),
        ('video', _('Vidéo')),
        ('document', _('Document')),
    ]
    
    initiative = models.ForeignKey(ClimateInitiative, on_delete=models.CASCADE, related_name='media')
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPE_CHOICES)
    file = models.FileField(upload_to='initiative_media/')
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('média')
        verbose_name_plural = _('médias')
        
    def __str__(self):
        return f"{self.get_media_type_display()} - {self.initiative.title}"


class Review(models.Model):
    """Avis et témoignages sur les initiatives"""
    initiative = models.ForeignKey(ClimateInitiative, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('avis')
        verbose_name_plural = _('avis')
        unique_together = ('initiative', 'user')
        
    def __str__(self):
        return f"Avis de {self.user.username} sur {self.initiative.title}"


class CrowdfundingCampaign(models.Model):
    """Campagnes de financement participatif"""
    STATUS_CHOICES = [
        ('draft', _('Brouillon')),
        ('active', _('Active')),
        ('completed', _('Terminée')),
        ('canceled', _('Annulée')),
    ]
    
    initiative = models.ForeignKey(ClimateInitiative, on_delete=models.CASCADE, related_name='campaigns')
    title = models.CharField(max_length=200)
    description = models.TextField()
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('campagne de financement')
        verbose_name_plural = _('campagnes de financement')
        
    def __str__(self):
        return self.title
    
    @property
    def progress_percentage(self):
        if self.goal_amount == 0:
            return 0
        return int((self.current_amount / self.goal_amount) * 100)
    
    @property
    def is_funded(self):
        return self.current_amount >= self.goal_amount


class Reward(models.Model):
    """Récompenses pour les donateurs"""
    campaign = models.ForeignKey(CrowdfundingCampaign, on_delete=models.CASCADE, related_name='rewards')
    title = models.CharField(max_length=100)
    description = models.TextField()
    minimum_donation = models.DecimalField(max_digits=10, decimal_places=2)
    available_quantity = models.IntegerField(null=True, blank=True, help_text="Laisser vide si illimité")
    claimed_quantity = models.IntegerField(default=0)
    
    class Meta:
        verbose_name = _('récompense')
        verbose_name_plural = _('récompenses')
        
    def __str__(self):
        return f"{self.title} ({self.minimum_donation}€)"
    
    @property
    def is_available(self):
        if self.available_quantity is None:
            return True
        return self.claimed_quantity < self.available_quantity


class Donation(models.Model):
    """Dons pour les campagnes de financement"""
    STATUS_CHOICES = [
        ('pending', _('En attente')),
        ('completed', _('Complété')),
        ('failed', _('Échoué')),
        ('refunded', _('Remboursé')),
    ]
    
    campaign = models.ForeignKey(CrowdfundingCampaign, on_delete=models.CASCADE, related_name='donations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='donations')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reward = models.ForeignKey(Reward, on_delete=models.SET_NULL, null=True, blank=True, related_name='donations')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=100, blank=True)
    is_anonymous = models.BooleanField(default=False)
    message = models.TextField(blank=True)
    
    class Meta:
        verbose_name = _('don')
        verbose_name_plural = _('dons')
        
    def __str__(self):
        return f"Don de {self.amount}€ par {self.user.username if not self.is_anonymous else 'Anonyme'}"


class Discussion(models.Model):
    """Forums de discussion"""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='discussions')
    created_at = models.DateTimeField(auto_now_add=True)
    categories = models.ManyToManyField(Category, related_name='discussions')
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, related_name='discussions')
    is_closed = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _('discussion')
        verbose_name_plural = _('discussions')
        
    def __str__(self):
        return self.title


class DiscussionMessage(models.Model):
    """Messages dans les discussions"""
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name='messages')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='discussion_messages')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_edited = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _('message')
        verbose_name_plural = _('messages')
        ordering = ['created_at']
        
    def __str__(self):
        return f"Message de {self.user.username} dans {self.discussion.title}"


class Event(models.Model):
    """Événements en ligne ou en personne"""
    EVENT_TYPE_CHOICES = [
        ('online', _('En ligne')),
        ('in_person', _('En personne')),
        ('hybrid', _('Hybride')),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organized_events')
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES)
    location = models.CharField(max_length=255, blank=True)
    online_link = models.URLField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='events')
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, related_name='events')
    featured_image = models.ImageField(upload_to='events/', null=True, blank=True)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('événement')
        verbose_name_plural = _('événements')
        
    def __str__(self):
        return self.title


class EventRegistration(models.Model):
    """Inscriptions aux événements"""
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='event_registrations')
    registration_date = models.DateTimeField(auto_now_add=True)
    attended = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _('inscription à un événement')
        verbose_name_plural = _('inscriptions aux événements')
        unique_together = ('event', 'user')
        
    def __str__(self):
        return f"{self.user.username} - {self.event.title}"


class ClimateData(models.Model):
    """Données climatiques locales (open data)"""
    DATA_TYPE_CHOICES = [
        ('air_quality', _('Qualité de l\'air')),
        ('temperature', _('Température')),
        ('rainfall', _('Précipitations')),
        ('emissions', _('Émissions CO2')),
        ('other', _('Autre')),
    ]
    
    region = models.ForeignKey(Region, on_delete=models.CASCADE, related_name='climate_data')
    data_type = models.CharField(max_length=20, choices=DATA_TYPE_CHOICES)
    value = models.FloatField()
    unit = models.CharField(max_length=20)
    date = models.DateField()
    source = models.CharField(max_length=255)
    source_url = models.URLField(blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('donnée climatique')
        verbose_name_plural = _('données climatiques')
        
    def __str__(self):
        return f"{self.get_data_type_display()} - {self.region.name} - {self.date}"


class Notification(models.Model):
    """Notifications pour les utilisateurs"""
    TYPE_CHOICES = [
        ('review', _('Nouvel avis')),
        ('donation', _('Nouveau don')),
        ('message', _('Nouveau message')),
        ('event', _('Événement')),
        ('campaign_update', _('Mise à jour de campagne')),
        ('system', _('Système')),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    title = models.CharField(max_length=100)
    content = models.TextField()
    url = models.CharField(max_length=255, blank=True, help_text="URL à laquelle rediriger l'utilisateur")
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('notification')
        verbose_name_plural = _('notifications')
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.title} pour {self.user.username}"