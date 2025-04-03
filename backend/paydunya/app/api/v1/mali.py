"""
Routes pour les services de paiement au Mali
"""
from fastapi import APIRouter
from app.models.mali import OrangeMoneyMlRequest, MoovMlRequest
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payment/mali", tags=["Mali"])

@router.post("/orange-money")
async def orange_money_mali(request: OrangeMoneyMlRequest):
    """Paiement via Orange Money Mali"""
    payload = {
        "orange_money_mali_customer_fullname": request.orange_money_mali_customer_fullname,
        "orange_money_mali_email": request.orange_money_mali_email,
        "orange_money_mali_phone_number": request.orange_money_mali_phone_number,
        "orange_money_mali_customer_address": request.orange_money_mali_customer_address,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/orange-money-mali", payload)

@router.post("/moov")
async def moov_mali(request: MoovMlRequest):
    """Paiement via Moov Mali"""
    payload = {
        "moov_ml_customer_fullname": request.moov_ml_customer_fullname,
        "moov_ml_email": request.moov_ml_email,
        "moov_ml_phone_number": request.moov_ml_phone_number,
        "moov_ml_customer_address": request.moov_ml_customer_address,
        "payment_token": request.payment_token
    }
    
    return await PaymentService.process_payment("softpay/moov-mali", payload)