"""
Routes pour les services de paiement au Togo
"""
from fastapi import APIRouter
from app.models.togo import TMoneyTgRequest, MoovTgRequest
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payment/togo", tags=["Togo"])

@router.post("/t-money")
async def t_money_togo(request: TMoneyTgRequest):
    """Paiement via T-Money Togo"""
    payload = {
        "name_t_money": request.name_t_money,
        "email_t_money": request.email_t_money,
        "phone_t_money": request.phone_t_money,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/t-money-togo", payload)

@router.post("/moov")
async def moov_togo(request: MoovTgRequest):
    """Paiement via Moov Togo"""
    payload = {
        "moov_togo_customer_fullname": request.moov_togo_customer_fullname,
        "moov_togo_email": request.moov_togo_email,
        "moov_togo_customer_address": request.moov_togo_customer_address,
        "moov_togo_phone_number": request.moov_togo_phone_number,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/moov-togo", payload)