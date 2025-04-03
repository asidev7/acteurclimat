

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-$$j-ka2fpvhw@a^n01t4u23i1tjg#9^ic_naq0#*j3$mbo^!6n'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'api.iaperibot.pro',  # Ajouter ton domaine ici
    'www.api.iaperibot.pro',  # Si tu veux également accepter les versions avec www
    'localhost',  # Exemple pour le développement local
    '127.0.0.1',  # Exemple pour le développement local
    'd3b2-156-0-214-32.ngrok-free.app',
]


# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
     'django_filters',

     'rest_framework',
    'rest_framework_simplejwt',
    'drf_yasg',
    'core',
    'corsheaders', 

]
AUTH_USER_MODEL = 'core.User'  # Modèle User personnalisé



# settings.py
SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'Bearer': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header',
            'description': 'Entrez votre token sous la forme: Bearer <votre_token>'
        }
    },
    'USE_SESSION_AUTH': False,  # Désactive l'authentification par session pour utiliser uniquement le token
}



LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}


FEDAPAY_API_TOKEN = "sk_live_MJEzWZdojy2AMNx-Y_x2j558"
from datetime import timedelta

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}


CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
    'https://iaperibot.pro',  # Ajouter ton domaine ici
    'https://www.iaperibot.pro',  # Si tu veux autoriser la version avec www
]


CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://\w+\.iaperibot\.pro$",  # Permet tous les sous-domaines de iaperibot.pro
]

CORS_ALLOW_CREDENTIALS = True


CRONJOBS = [
    ('0 0 * * *', 'core.management.commands.check_subscriptions.Command')
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Doit être placé en haut
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

import os 
# FedaPay Integration Settings
FEDAPAY_API_KEY = os.environ.get('FEDAPAY_API_KEY', 'sk_live_MJEzWZdojy2AMNx-Y_x2j558')  # Votre clé API FedaPay
FEDAPAY_API_URL = os.environ.get('FEDAPAY_API_URL', 'https://api.fedapay.com/v1/transactions')
FEDAPAY_CALLBACK_URL = os.environ.get('FEDAPAY_CALLBACK_URL', 'https://iaparibot.pro/payment/webhook/')
FEDAPAY_REDIRECT_URL = os.environ.get('FEDAPAY_REDIRECT_URL', 'https://iaparibot.pro/payment/success/')
FEDAPAY_WEBHOOK_SECRET = os.environ.get('FEDAPAY_WEBHOOK_SECRET', 'wh_live_JTJpkywKIARSicwWeTa1Af2d')  # Secret de webhook si disponible

# URL du frontend pour les liens dans les emails
FRONTEND_URL = 'http://localhost:8000'  # Remplacez par l'URL de votre frontend React

# Email de l'expéditeur par défaut
DEFAULT_FROM_EMAIL = 'no-reply@iaparibot.pro'

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'

import os

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "app_static"),
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'fr-fr'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'solutionasitech@gmail.com'  # Remplace par ton email
EMAIL_HOST_PASSWORD = 'gqldkxwyvtpjxuur'  # Remplace par ton mot de passe ou un App Password
DEFAULT_FROM_EMAIL = 'noreply@kollopay.africa'



import os

# Configurations des fichiers statiques
STATIC_URL = '/static/'  # URL pour accéder aux fichiers statiques
STATIC_ROOT = os.path.join(BASE_DIR, 'static')  # Dossier où les fichiers statiques seront collectés pour la production

# Directories supplémentaires où Django recherchera les fichiers statiques
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'app_static'),  # Exemple : un dossier supplémentaire pour les fichiers statiques
]

# Configurations des fichiers médias
MEDIA_URL = '/media/'  # URL pour accéder aux fichiers médias (téléchargés par les utilisateurs)
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # Dossier où les fichiers médias seront stockés

