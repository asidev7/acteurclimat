# core/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import Group, Permission
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings  # Importez settings pour utiliser AUTH_USER_MODEL

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

class User(AbstractBaseUser, PermissionsMixin):
    """
    Modèle utilisateur personnalisé utilisant l'email comme identifiant principal.
    """
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=False)  # Par défaut, les utilisateurs ne sont pas actifs
    is_staff = models.BooleanField(default=False)  # Détermine si l'utilisateur peut accéder à l'admin
    created_at = models.DateTimeField(auto_now_add=True)  # Date de création de l'utilisateur

    # Relations ManyToMany avec les groupes et les permissions
    groups = models.ManyToManyField(Group, related_name="custom_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True)

    objects = CustomUserManager()  # Utilise le gestionnaire personnalisé

    USERNAME_FIELD = 'email'  # Utilise l'email comme identifiant principal
    REQUIRED_FIELDS = []  # Aucun champ supplémentaire requis

    def __str__(self):
        """
        Représentation en chaîne de caractères de l'utilisateur.
        """
        return self.email

    def send_verification_email(self):
        """
        Envoie un email de vérification à l'utilisateur pour activer son compte.
        """
        # Générer un token JWT pour l'utilisateur
        refresh = RefreshToken.for_user(self)
        token = str(refresh.access_token)

        # Créer le lien de vérification avec le token
        verification_link = f"http://127.0.0.1:8000/api/users/verify-email/?token={token}"

        # Rendre le template HTML
        email_body = render_to_string('email/verification_email.html', {
            'verification_link': verification_link,
        })

        # Envoyer l'e-mail
        email = EmailMessage(
            'Vérification de votre email',
            email_body,
            'no-reply@example.com',  # Remplacez par votre email d'expéditeur
            [self.email],  # Destinataire
        )
        email.content_subtype = "html"  # Définir le contenu comme HTML
        email.send(fail_silently=False)  # Envoyer l'email (ne pas échouer silencieusement)
        
        
        
class FAQ(models.Model):
    """Model representing a Frequently Asked Question."""
    question = models.CharField(_("Question"), max_length=255)
    answer = models.TextField(_("Answer"))
    order = models.PositiveIntegerField(_("Display Order"), default=0)
    is_active = models.BooleanField(_("Active"), default=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("FAQ")
        verbose_name_plural = _("FAQs")
        ordering = ["order", "question"]

    def __str__(self):
        return self.question



