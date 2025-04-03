"""
Routes pour les services de paiement au Bénin
"""
from fastapi import APIRouter
from app.models.benin import MoovBjRequest, MtnBjRequest
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payment/benin", tags=["Bénin"])

@router.post("/moov")
async def moov_benin(request: MoovBjRequest):
    """Paiement via Moov Bénin"""
    payload = {
        "moov_benin_customer_fullname": request.moov_benin_customer_fullname,
        "moov_benin_email": request.moov_benin_email,
        "moov_benin_phone_number": request.moov_benin_phone_number,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/moov-benin", payload)

@router.post("/mtn")
async def mtn_benin(request: MtnBjRequest):
    """Paiement via MTN Bénin"""
    payload = {
        "mtn_benin_customer_fullname": request.mtn_benin_customer_fullname,
        "mtn_benin_email": request.mtn_benin_email,
        "mtn_benin_phone_number": request.mtn_benin_phone_number,
        "mtn_benin_wallet_provider": request.mtn_benin_wallet_provider,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/mtn-benin", payload)