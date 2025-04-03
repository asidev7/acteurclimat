"""
Routes pour les services de paiement en Côte d'Ivoire
"""
from fastapi import APIRouter
from app.models.cote_divoire import OrangeMoneyCiRequest, MtnCiRequest, MoovCiRequest, WaveCiRequest
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payment/cote-divoire", tags=["Côte d'Ivoire"])

@router.post("/orange-money")
async def orange_money_ci(request: OrangeMoneyCiRequest):
    """Paiement via Orange Money Côte d'Ivoire"""
    payload = {
        "orange_money_ci_customer_fullname": request.orange_money_ci_customer_fullname,
        "orange_money_ci_email": request.orange_money_ci_email,
        "orange_money_ci_phone_number": request.orange_money_ci_phone_number,
        "orange_money_ci_otp": request.orange_money_ci_otp,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/orange-money-ci", payload)

@router.post("/mtn")
async def mtn_ci(request: MtnCiRequest):
    """Paiement via MTN Côte d'Ivoire"""
    payload = {
        "mtn_ci_customer_fullname": request.mtn_ci_customer_fullname,
        "mtn_ci_email": request.mtn_ci_email,
        "mtn_ci_phone_number": request.mtn_ci_phone_number,
        "mtn_ci_wallet_provider": request.mtn_ci_wallet_provider,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/mtn-ci", payload)

@router.post("/moov")
async def moov_ci(request: MoovCiRequest):
    """Paiement via Moov Côte d'Ivoire"""
    payload = {
        "moov_ci_customer_fullname": request.moov_ci_customer_fullname,
        "moov_ci_email": request.moov_ci_email,
        "moov_ci_phone_number": request.moov_ci_phone_number,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/moov-ci", payload)

@router.post("/wave")
async def wave_ci(request: WaveCiRequest):
    """Paiement via Wave Côte d'Ivoire"""
    payload = {
        "wave_ci_fullName": request.wave_ci_fullName,
        "wave_ci_email": request.wave_ci_email,
        "wave_ci_phone": request.wave_ci_phone,
        "wave_ci_payment_token": request.wave_ci_payment_token
    }
    
    return await PaymentService.process_payment("softpay/wave-ci", payload)