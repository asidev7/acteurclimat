"""
Modèles pour les services du Mali
"""
from pydantic import BaseModel

class OrangeMoneyMlRequest(BaseModel):
    """Requête pour Orange Money Mali"""
    orange_money_mali_customer_fullname: str
    orange_money_mali_email: str
    orange_money_mali_phone_number: str
    orange_money_mali_customer_address: str
    payment_token: str

class MoovMlRequest(BaseModel):
    """Requête pour Moov Mali"""
    moov_ml_customer_fullname: str
    moov_ml_email: str
    moov_ml_phone_number: str
    moov_ml_customer_address: str
    payment_token: str