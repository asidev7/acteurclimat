"""
Modèles pour les services Sénégalais
"""
from pydantic import BaseModel
from typing import Optional
from app.models.base import OrangeMoneyApiType

class OrangeMoneySnRequest(BaseModel):
    """Requête pour Orange Money Sénégal"""
    customer_name: str
    customer_email: str
    phone_number: str
    invoice_token: str
    api_type: OrangeMoneyApiType
    authorization_code: Optional[str] = None

class FreeMoneySnRequest(BaseModel):
    """Requête pour Free Money Sénégal"""
    customer_name: str
    customer_email: str
    phone_number: str
    payment_token: str

class ExpressoSnRequest(BaseModel):
    """Requête pour Expresso Sénégal"""
    expresso_sn_fullName: str
    expresso_sn_email: str
    expresso_sn_phone: str
    payment_token: str

class WaveSnRequest(BaseModel):
    """Requête pour Wave Sénégal"""
    wave_senegal_fullName: str
    wave_senegal_email: str
    wave_senegal_phone: str
    wave_senegal_payment_token: str

class WizallSnRequest(BaseModel):
    """Requête pour Wizall Sénégal"""
    customer_name: str
    customer_email: str
    phone_number: str
    invoice_token: str

class WizallSnConfirmRequest(BaseModel):
    """Requête pour confirmer un paiement Wizall Sénégal"""
    authorization_code: str
    phone_number: str
    transaction_id: str