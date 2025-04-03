"""
Modèles pour les services du Togo
"""
from pydantic import BaseModel

class TMoneyTgRequest(BaseModel):
    """Requête pour T-Money Togo"""
    name_t_money: str
    email_t_money: str
    phone_t_money: str
    payment_token: str

class MoovTgRequest(BaseModel):
    """Requête pour Moov Togo"""
    moov_togo_customer_fullname: str
    moov_togo_email: str
    moov_togo_customer_address: str
    moov_togo_phone_number: str
    payment_token: str