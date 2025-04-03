"""
Configuration et paramètres de l'application
"""
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

# Configuration PayDunya
PAYDUNYA_MASTER_KEY = os.getenv("PAYDUNYA_MASTER_KEY", "")
PAYDUNYA_PRIVATE_KEY = os.getenv("PAYDUNYA_PRIVATE_KEY", "")
PAYDUNYA_TOKEN = os.getenv("PAYDUNYA_TOKEN", "")
PAYDUNYA_BASE_URL = "https://app.paydunya.com/api/v1"

# Informations de l'API
API_TITLE = "PayDunya API Wrapper"
API_DESCRIPTION = "API wrapper pour les services de paiement PayDunya dans tous les pays supportés"
API_VERSION = "1.0.0"