"""
Routes pour les services de paiement internationaux
"""
from fastapi import APIRouter
from app.models.international import CardPaymentRequest, PaydunyaWalletRequest
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payment", tags=["International"])

@router.post("/card")
async def card_payment(request: CardPaymentRequest):
    """Paiement par carte bancaire"""
    payload = {
        "full_name": request.full_name,
        "email": request.email,
        "card_number": request.card_number,
        "card_cvv": request.card_cvv,
        "card_expired_date_year": request.card_expired_date_year,
        "card_expired_date_month": request.card_expired_date_month,
        "token": request.token
    }
    
    return await PaymentService.process_payment("softpay/card", payload)

@router.post("/paydunya-wallet")
async def paydunya_wallet(request: PaydunyaWalletRequest):
    """Paiement via portefeuille PayDunya"""
    payload = {
        "customer_name": request.customer_name,
        "customer_email": request.customer_email,
        "phone_phone": request.phone_phone,
        "password": request.password,
        "invoice_token": request.invoice_token
    }
    
    return await PaymentService.process_payment("softpay/paydunya", payload)