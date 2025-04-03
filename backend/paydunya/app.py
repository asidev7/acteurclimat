from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
import requests
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from enum import Enum

# Charger les variables d'environnement
load_dotenv()

# Créer l'application FastAPI
app = FastAPI(
    title="PayDunya API Wrapper",
    description="API wrapper pour les services de paiement PayDunya dans tous les pays supportés",
    version="1.0.0"
)

# Configuration PayDunya
PAYDUNYA_MASTER_KEY = os.getenv("PAYDUNYA_MASTER_KEY", "")
PAYDUNYA_PRIVATE_KEY = os.getenv("PAYDUNYA_PRIVATE_KEY", "")
PAYDUNYA_TOKEN = os.getenv("PAYDUNYA_TOKEN", "")
PAYDUNYA_BASE_URL = "https://app.paydunya.com/api/v1"

# Types d'API pour Orange Money
class OrangeMoneyApiType(str, Enum):
    QRCODE = "QRCODE"
    OTPCODE = "OTPCODE"

# Modèles Pydantic
class InvoiceItem(BaseModel):
    name: str
    quantity: int
    unit_price: str
    total_price: str
    description: Optional[str] = ""

class InvoiceTax(BaseModel):
    name: str
    amount: int

class StoreInfo(BaseModel):
    name: str
    tagline: Optional[str] = ""
    postal_address: Optional[str] = ""
    phone: Optional[str] = ""
    logo_url: Optional[str] = ""
    website_url: Optional[str] = ""

class CreateInvoiceRequest(BaseModel):
    total_amount: int
    description: Optional[str] = ""
    items: Optional[Dict[str, Any]] = {}
    taxes: Optional[Dict[str, Any]] = {}
    store_name: str
    store_tagline: Optional[str] = ""
    callback_url: Optional[str] = ""
    custom_data: Optional[Dict[str, Any]] = {}

# SENEGAL
class OrangeMoneySnRequest(BaseModel):
    customer_name: str
    customer_email: str
    phone_number: str
    invoice_token: str
    api_type: OrangeMoneyApiType
    authorization_code: Optional[str] = None

class FreeMoneySnRequest(BaseModel):
    customer_name: str
    customer_email: str
    phone_number: str
    payment_token: str

class ExpressoSnRequest(BaseModel):
    expresso_sn_fullName: str
    expresso_sn_email: str
    expresso_sn_phone: str
    payment_token: str

class WaveSnRequest(BaseModel):
    wave_senegal_fullName: str
    wave_senegal_email: str
    wave_senegal_phone: str
    wave_senegal_payment_token: str

class WizallSnRequest(BaseModel):
    customer_name: str
    customer_email: str
    phone_number: str
    invoice_token: str

class WizallSnConfirmRequest(BaseModel):
    authorization_code: str
    phone_number: str
    transaction_id: str

# COTE D'IVOIRE
class OrangeMoneyCiRequest(BaseModel):
    orange_money_ci_customer_fullname: str
    orange_money_ci_email: str
    orange_money_ci_phone_number: str
    orange_money_ci_otp: str
    payment_token: str

class MtnCiRequest(BaseModel):
    mtn_ci_customer_fullname: str
    mtn_ci_email: str
    mtn_ci_phone_number: str
    mtn_ci_wallet_provider: str = "MTNCI"
    payment_token: str

class MoovCiRequest(BaseModel):
    moov_ci_customer_fullname: str
    moov_ci_email: str
    moov_ci_phone_number: str
    payment_token: str

class WaveCiRequest(BaseModel):
    wave_ci_fullName: str
    wave_ci_email: str
    wave_ci_phone: str
    wave_ci_payment_token: str

# BURKINA FASO
class OrangeMoneyBfRequest(BaseModel):
    name_bf: str
    email_bf: str
    phone_bf: str
    otp_code: str
    payment_token: str

class MoovBfRequest(BaseModel):
    moov_burkina_faso_fullName: str
    moov_burkina_faso_email: str
    moov_burkina_faso_phone_number: str
    moov_burkina_faso_payment_token: str

# BENIN
class MoovBjRequest(BaseModel):
    moov_benin_customer_fullname: str
    moov_benin_email: str
    moov_benin_phone_number: str
    payment_token: str

class MtnBjRequest(BaseModel):
    mtn_benin_customer_fullname: str
    mtn_benin_email: str
    mtn_benin_phone_number: str
    mtn_benin_wallet_provider: str = "MTNBENIN"
    payment_token: str

# TOGO
class TMoneyTgRequest(BaseModel):
    name_t_money: str
    email_t_money: str
    phone_t_money: str
    payment_token: str

class MoovTgRequest(BaseModel):
    moov_togo_customer_fullname: str
    moov_togo_email: str
    moov_togo_customer_address: str
    moov_togo_phone_number: str
    payment_token: str

# MALI
class OrangeMoneyMlRequest(BaseModel):
    orange_money_mali_customer_fullname: str
    orange_money_mali_email: str
    orange_money_mali_phone_number: str
    orange_money_mali_customer_address: str
    payment_token: str

class MoovMlRequest(BaseModel):
    moov_ml_customer_fullname: str
    moov_ml_email: str
    moov_ml_phone_number: str
    moov_ml_customer_address: str
    payment_token: str

# CARTE BANCAIRE
class CardPaymentRequest(BaseModel):
    full_name: str
    email: str
    card_number: str
    card_cvv: str
    card_expired_date_year: str
    card_expired_date_month: str
    token: str

# PAYDUNYA
class PaydunyaWalletRequest(BaseModel):
    customer_name: str
    customer_email: str
    phone_phone: str
    password: str
    invoice_token: str

# Configuration des en-têtes
def get_paydunya_headers():
    return {
        "Content-Type": "application/json",
        "PAYDUNYA-MASTER-KEY": PAYDUNYA_MASTER_KEY,
        "PAYDUNYA-PRIVATE-KEY": PAYDUNYA_PRIVATE_KEY,
        "PAYDUNYA-TOKEN": PAYDUNYA_TOKEN
    }

# Routes de l'API
@app.get("/")
def read_root():
    return {"message": "PayDunya API wrapper is running"}

@app.get("/payment-methods")
def get_payment_methods():
    """Liste tous les moyens de paiement disponibles"""
    return {
        "payment_methods": [
            {"country": "Sénégal", "methods": ["Orange Money", "Free Money", "Expresso", "Wave", "Wizall"]},
            {"country": "Côte d'Ivoire", "methods": ["Orange Money", "MTN Money", "Moov", "Wave"]},
            {"country": "Burkina Faso", "methods": ["Orange Money", "Moov"]},
            {"country": "Bénin", "methods": ["Moov", "MTN Money"]},
            {"country": "Togo", "methods": ["T-Money", "Moov"]},
            {"country": "Mali", "methods": ["Orange Money", "Moov"]},
            {"country": "International", "methods": ["Carte Bancaire", "PayDunya Wallet"]}
        ]
    }

@app.post("/create-invoice")
async def create_invoice(request: CreateInvoiceRequest):
    """Créer une facture PayDunya"""
    url = f"{PAYDUNYA_BASE_URL}/checkout-invoice/create"
    
    # Construire le payload
    payload = {
        "invoice": {
            "total_amount": request.total_amount,
            "description": request.description,
            "items": request.items,
            "taxes": request.taxes
        },
        "store": {
            "name": request.store_name,
            "tagline": request.store_tagline
        }
    }
    
    if request.callback_url:
        payload["actions"] = {"callback_url": request.callback_url}
    
    if request.custom_data:
        payload["custom_data"] = request.custom_data
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

# ==================== SENEGAL ====================
@app.post("/payment/senegal/orange-money")
async def orange_money_senegal(request: OrangeMoneySnRequest):
    """Paiement via Orange Money Sénégal (QR Code ou OTP)"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/new-orange-money-senegal"
    
    payload = {
        "customer_name": request.customer_name,
        "customer_email": request.customer_email,
        "phone_number": request.phone_number,
        "invoice_token": request.invoice_token,
        "api_type": request.api_type
    }
    
    # Ajouter le code d'autorisation pour le mode OTP
    if request.api_type == OrangeMoneyApiType.OTPCODE and request.authorization_code:
        payload["authorization_code"] = request.authorization_code
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/senegal/free-money")
async def free_money_senegal(request: FreeMoneySnRequest):
    """Paiement via Free Money Sénégal"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/free-money-senegal"
    
    payload = {
        "customer_name": request.customer_name,
        "customer_email": request.customer_email,
        "phone_number": request.phone_number,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/senegal/expresso")
async def expresso_senegal(request: ExpressoSnRequest):
    """Paiement via Expresso Sénégal"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/expresso-senegal"
    
    payload = {
        "expresso_sn_fullName": request.expresso_sn_fullName,
        "expresso_sn_email": request.expresso_sn_email,
        "expresso_sn_phone": request.expresso_sn_phone,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/senegal/wave")
async def wave_senegal(request: WaveSnRequest):
    """Paiement via Wave Sénégal"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/wave-senegal"
    
    payload = {
        "wave_senegal_fullName": request.wave_senegal_fullName,
        "wave_senegal_email": request.wave_senegal_email,
        "wave_senegal_phone": request.wave_senegal_phone,
        "wave_senegal_payment_token": request.wave_senegal_payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/senegal/wizall")
async def wizall_senegal(request: WizallSnRequest):
    """Paiement via Wizall Sénégal"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/wizall-money-senegal"
    
    payload = {
        "customer_name": request.customer_name,
        "customer_email": request.customer_email,
        "phone_number": request.phone_number,
        "invoice_token": request.invoice_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/senegal/wizall/confirm")
async def wizall_senegal_confirm(request: WizallSnConfirmRequest):
    """Confirmer le paiement via Wizall Sénégal"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/wizall-money-senegal/confirm"
    
    payload = {
        "authorization_code": request.authorization_code,
        "phone_number": request.phone_number,
        "transaction_id": request.transaction_id
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

# ==================== COTE D'IVOIRE ====================
@app.post("/payment/cote-divoire/orange-money")
async def orange_money_ci(request: OrangeMoneyCiRequest):
    """Paiement via Orange Money Côte d'Ivoire"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/orange-money-ci"
    
    payload = {
        "orange_money_ci_customer_fullname": request.orange_money_ci_customer_fullname,
        "orange_money_ci_email": request.orange_money_ci_email,
        "orange_money_ci_phone_number": request.orange_money_ci_phone_number,
        "orange_money_ci_otp": request.orange_money_ci_otp,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/cote-divoire/mtn")
async def mtn_ci(request: MtnCiRequest):
    """Paiement via MTN Côte d'Ivoire"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/mtn-ci"
    
    payload = {
        "mtn_ci_customer_fullname": request.mtn_ci_customer_fullname,
        "mtn_ci_email": request.mtn_ci_email,
        "mtn_ci_phone_number": request.mtn_ci_phone_number,
        "mtn_ci_wallet_provider": request.mtn_ci_wallet_provider,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/cote-divoire/moov")
async def moov_ci(request: MoovCiRequest):
    """Paiement via Moov Côte d'Ivoire"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/moov-ci"
    
    payload = {
        "moov_ci_customer_fullname": request.moov_ci_customer_fullname,
        "moov_ci_email": request.moov_ci_email,
        "moov_ci_phone_number": request.moov_ci_phone_number,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/cote-divoire/wave")
async def wave_ci(request: WaveCiRequest):
    """Paiement via Wave Côte d'Ivoire"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/wave-ci"
    
    payload = {
        "wave_ci_fullName": request.wave_ci_fullName,
        "wave_ci_email": request.wave_ci_email,
        "wave_ci_phone": request.wave_ci_phone,
        "wave_ci_payment_token": request.wave_ci_payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

# ==================== BURKINA FASO ====================
@app.post("/payment/burkina-faso/orange-money")
async def orange_money_bf(request: OrangeMoneyBfRequest):
    """Paiement via Orange Money Burkina Faso"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/orange-money-burkina"
    
    payload = {
        "name_bf": request.name_bf,
        "email_bf": request.email_bf,
        "phone_bf": request.phone_bf,
        "otp_code": request.otp_code,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/burkina-faso/moov")
async def moov_bf(request: MoovBfRequest):
    """Paiement via Moov Burkina Faso"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/moov-burkina"
    
    payload = {
        "moov_burkina_faso_fullName": request.moov_burkina_faso_fullName,
        "moov_burkina_faso_email": request.moov_burkina_faso_email,
        "moov_burkina_faso_phone_number": request.moov_burkina_faso_phone_number,
        "moov_burkina_faso_payment_token": request.moov_burkina_faso_payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

# ==================== BENIN ====================
@app.post("/payment/benin/moov")
async def moov_benin(request: MoovBjRequest):
    """Paiement via Moov Bénin"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/moov-benin"
    
    payload = {
        "moov_benin_customer_fullname": request.moov_benin_customer_fullname,
        "moov_benin_email": request.moov_benin_email,
        "moov_benin_phone_number": request.moov_benin_phone_number,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/benin/mtn")
async def mtn_benin(request: MtnBjRequest):
    """Paiement via MTN Bénin"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/mtn-benin"
    
    payload = {
        "mtn_benin_customer_fullname": request.mtn_benin_customer_fullname,
        "mtn_benin_email": request.mtn_benin_email,
        "mtn_benin_phone_number": request.mtn_benin_phone_number,
        "mtn_benin_wallet_provider": request.mtn_benin_wallet_provider,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

# ==================== TOGO ====================
@app.post("/payment/togo/t-money")
async def t_money_togo(request: TMoneyTgRequest):
    """Paiement via T-Money Togo"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/t-money-togo"
    
    payload = {
        "name_t_money": request.name_t_money,
        "email_t_money": request.email_t_money,
        "phone_t_money": request.phone_t_money,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/togo/moov")
async def moov_togo(request: MoovTgRequest):
    """Paiement via Moov Togo"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/moov-togo"
    
    payload = {
        "moov_togo_customer_fullname": request.moov_togo_customer_fullname,
        "moov_togo_email": request.moov_togo_email,
        "moov_togo_customer_address": request.moov_togo_customer_address,
        "moov_togo_phone_number": request.moov_togo_phone_number,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

# ==================== MALI ====================
@app.post("/payment/mali/orange-money")
async def orange_money_mali(request: OrangeMoneyMlRequest):
    """Paiement via Orange Money Mali"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/orange-money-mali"
    
    payload = {
        "orange_money_mali_customer_fullname": request.orange_money_mali_customer_fullname,
        "orange_money_mali_email": request.orange_money_mali_email,
        "orange_money_mali_phone_number": request.orange_money_mali_phone_number,
        "orange_money_mali_customer_address": request.orange_money_mali_customer_address,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

@app.post("/payment/mali/moov")
async def moov_mali(request: MoovMlRequest):
    """Paiement via Moov Mali"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/moov-mali"
    
    payload = {
        "moov_ml_customer_fullname": request.moov_ml_customer_fullname,
        "moov_ml_email": request.moov_ml_email,
        "moov_ml_phone_number": request.moov_ml_phone_number,
        "moov_ml_customer_address": request.moov_ml_customer_address,
        "payment_token": request.payment_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

# ==================== CARTE BANCAIRE ====================
@app.post("/payment/card")
async def card_payment(request: CardPaymentRequest):
    """Paiement par carte bancaire"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/card"
    
    payload = {
        "full_name": request.full_name,
        "email": request.email,
        "card_number": request.card_number,
        "card_cvv": request.card_cvv,
        "card_expired_date_year": request.card_expired_date_year,
        "card_expired_date_month": request.card_expired_date_month,
        "token": request.token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

# ==================== PAYDUNYA WALLET ====================
@app.post("/payment/paydunya-wallet")
async def paydunya_wallet(request: PaydunyaWalletRequest):
    """Paiement via portefeuille PayDunya"""
    url = f"{PAYDUNYA_BASE_URL}/softpay/paydunya"
    
    payload = {
        "customer_name": request.customer_name,
        "customer_email": request.customer_email,
        "phone_phone": request.phone_phone,
        "password": request.password,
        "invoice_token": request.invoice_token
    }
    
    try:
        response = requests.post(url, json=payload, headers=get_paydunya_headers())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")

# Gestionnaire d'erreurs
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.detail},
    )

# Exécuter avec: uvicorn app:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)