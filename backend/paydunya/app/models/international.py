"""
Modèles pour les services internationaux
"""
from pydantic import BaseModel

class CardPaymentRequest(BaseModel):
    """Requête pour paiement par carte bancaire"""
    full_name: str
    email: str
    card_number: str
    card_cvv: str
    card_expired_date_year: str
    card_expired_date_month: str
    token: str

class PaydunyaWalletRequest(BaseModel):
    """Requête pour paiement par portefeuille PayDunya"""
    customer_name: str
    customer_email: str
    phone_phone: str
    password: str
    invoice_token: str