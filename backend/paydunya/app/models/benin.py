"""
Modèles pour les services du Bénin
"""
from pydantic import BaseModel

class MoovBjRequest(BaseModel):
    """Requête pour Moov Bénin"""
    moov_benin_customer_fullname: str
    moov_benin_email: str
    moov_benin_phone_number: str
    payment_token: str

class MtnBjRequest(BaseModel):
    """Requête pour MTN Bénin"""
    mtn_benin_customer_fullname: str
    mtn_benin_email: str
    mtn_benin_phone_number: str
    mtn_benin_wallet_provider: str = "MTNBENIN"
    payment_token: str