"""
Routes pour les services de paiement au Burkina Faso
"""
from fastapi import APIRouter
from app.models.burkina_faso import OrangeMoneyBfRequest, MoovBfRequest
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payment/burkina-faso", tags=["Burkina Faso"])

@router.post("/orange-money")
async def orange_money_bf(request: OrangeMoneyBfRequest):
    """Paiement via Orange Money Burkina Faso"""
    payload = {
        "name_bf": request.name_bf,
        "email_bf": request.email_bf,
        "phone_bf": request.phone_bf,
        "otp_code": request.otp_code,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/orange-money-burkina", payload)

@router.post("/moov")
async def moov_bf(request: MoovBfRequest):
    """Paiement via Moov Burkina Faso"""
    payload = {
        "moov_burkina_faso_fullName": request.moov_burkina_faso_fullName,
        "moov_burkina_faso_email": request.moov_burkina_faso_email,
        "moov_burkina_faso_phone_number": request.moov_burkina_faso_phone_number,
        "moov_burkina_faso_payment_token": request.moov_burkina_faso_payment_token
    }
    
    return await PaymentService.process_payment("softpay/moov-burkina", payload)