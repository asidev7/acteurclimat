"""
Modèles pour les services du Burkina Faso
"""
from pydantic import BaseModel

class OrangeMoneyBfRequest(BaseModel):
    """Requête pour Orange Money Burkina Faso"""
    name_bf: str
    email_bf: str
    phone_bf: str
    otp_code: str
    payment_token: str

class MoovBfRequest(BaseModel):
    """Requête pour Moov Burkina Faso"""
    moov_burkina_faso_fullName: str
    moov_burkina_faso_email: str
    moov_burkina_faso_phone_number: str
    moov_burkina_faso_payment_token: str