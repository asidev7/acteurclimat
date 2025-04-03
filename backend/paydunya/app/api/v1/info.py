"""
Routes pour les informations générales
"""
from fastapi import APIRouter

router = APIRouter(tags=["Informations"])

@router.get("/")
def read_root():
    """Page d'accueil de l'API"""
    return {"message": "PayDunya API wrapper is running"}

@router.get("/payment-methods")
def get_payment_methods():
    """Liste tous les moyens de paiement disponibles"""
    return {
        "payment_methods": [
            {"country": "Sénégal", "methods": ["Orange Money", "Free Money", "Expresso", "Wave", "Wizall"]},
            {"country": "Côte d'Ivoire", "methods": ["Orange Money", "MTN Money", "Moov", "Wave"]},
            {"country": "Burkina Faso", "methods": ["Orange Money", "Moov"]},
            {"country": "Bénin", "methods": ["Moov", "MTN Money"]},
            {"country": "Togo", "methods": ["T-Money", "Moov"]},
            {"country": "Mali", "methods": ["Orange Money", "Moov"]},
            {"country": "International", "methods": ["Carte Bancaire", "PayDunya Wallet"]}
        ]
    }