"""
Routes pour les services de paiement au Sénégal
"""
from fastapi import APIRouter
from app.models.senegal import (
    OrangeMoneySnRequest,
    FreeMoneySnRequest,
    ExpressoSnRequest,
    WaveSnRequest,
    WizallSnRequest,
    WizallSnConfirmRequest
)
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payment/senegal", tags=["Sénégal"])

@router.post("/orange-money")
async def orange_money_senegal(request: OrangeMoneySnRequest):
    """Paiement via Orange Money Sénégal (QR Code ou OTP)"""
    payload = {
        "customer_name": request.customer_name,
        "customer_email": request.customer_email,
        "phone_number": request.phone_number,
        "invoice_token": request.invoice_token,
        "api_type": request.api_type
    }
    
    # Ajouter le code d'autorisation pour le mode OTP
    if request.api_type == "OTPCODE" and request.authorization_code:
        payload["authorization_code"] = request.authorization_code
    
    return await PaymentService.process_payment("softpay/new-orange-money-senegal", payload)

@router.post("/free-money")
async def free_money_senegal(request: FreeMoneySnRequest):
    """Paiement via Free Money Sénégal"""
    payload = {
        "customer_name": request.customer_name,
        "customer_email": request.customer_email,
        "phone_number": request.phone_number,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/free-money-senegal", payload)

@router.post("/expresso")
async def expresso_senegal(request: ExpressoSnRequest):
    """Paiement via Expresso Sénégal"""
    payload = {
        "expresso_sn_fullName": request.expresso_sn_fullName,
        "expresso_sn_email": request.expresso_sn_email,
        "expresso_sn_phone": request.expresso_sn_phone,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/expresso-senegal", payload)

@router.post("/wave")
async def wave_senegal(request: WaveSnRequest):
    """Paiement via Wave Sénégal"""
    payload = {
        "wave_senegal_fullName": request.wave_senegal_fullName,
        "wave_senegal_email": request.wave_senegal_email,
        "wave_senegal_phone": request.wave_senegal_phone,
        "wave_senegal_payment_token": request.wave_senegal_payment_token
    }
    
    return await PaymentService.process_payment("softpay/wave-senegal", payload)

@router.post("/wizall")
async def wizall_senegal(request: WizallSnRequest):
    """Paiement via Wizall Sénégal"""
    payload = {
        "customer_name": request.customer_name,
        "customer_email": request.customer_email,
        "phone_number": request.phone_number,
        "invoice_token": request.invoice_token
    }
    
    return await PaymentService.process_payment("softpay/wizall-money-senegal", payload)

@router.post("/wizall/confirm")
async def wizall_senegal_confirm(request: WizallSnConfirmRequest):
    """Confirmer le paiement via Wizall Sénégal"""
    payload = {
        "authorization_code": request.authorization_code,
        "phone_number": request.phone_number,
        "transaction_id": request.transaction_id
    }
    
    return await PaymentService.process_payment("softpay/wizall-money-senegal/confirm", payload)