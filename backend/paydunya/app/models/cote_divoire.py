"""
Modèles pour les services de Côte d'Ivoire
"""
from pydantic import BaseModel

class OrangeMoneyCiRequest(BaseModel):
    """Requête pour Orange Money Côte d'Ivoire"""
    orange_money_ci_customer_fullname: str
    orange_money_ci_email: str
    orange_money_ci_phone_number: str
    orange_money_ci_otp: str
    payment_token: str

class MtnCiRequest(BaseModel):
    """Requête pour MTN Côte d'Ivoire"""
    mtn_ci_customer_fullname: str
    mtn_ci_email: str
    mtn_ci_phone_number: str
    mtn_ci_wallet_provider: str = "MTNCI"
    payment_token: str

class MoovCiRequest(BaseModel):
    """Requête pour Moov Côte d'Ivoire"""
    moov_ci_customer_fullname: str
    moov_ci_email: str
    moov_ci_phone_number: str
    payment_token: str

class WaveCiRequest(BaseModel):
    """Requête pour Wave Côte d'Ivoire"""
    wave_ci_fullName: str
    wave_ci_email: str
    wave_ci_phone: str
    wave_ci_payment_token: str