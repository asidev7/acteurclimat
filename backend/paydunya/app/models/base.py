"""
Modèles de base partagés
"""
from enum import Enum
from pydantic import BaseModel
from typing import Optional, Dict, Any

class OrangeMoneyApiType(str, Enum):
    """Type d'API Orange Money"""
    QRCODE = "QRCODE"
    OTPCODE = "OTPCODE"

class InvoiceItem(BaseModel):
    """Élément d'une facture"""
    name: str
    quantity: int
    unit_price: str
    total_price: str
    description: Optional[str] = ""

class InvoiceTax(BaseModel):
    """Taxe appliquée à une facture"""
    name: str
    amount: int

class StoreInfo(BaseModel):
    """Informations sur le commerce"""
    name: str
    tagline: Optional[str] = ""
    postal_address: Optional[str] = ""
    phone: Optional[str] = ""
    logo_url: Optional[str] = ""
    website_url: Optional[str] = ""

class CreateInvoiceRequest(BaseModel):
    """Requête de création de facture"""
    total_amount: int
    description: Optional[str] = ""
    items: Optional[Dict[str, Any]] = {}
    taxes: Optional[Dict[str, Any]] = {}
    store_name: str
    store_tagline: Optional[str] = ""
    callback_url: Optional[str] = ""
    custom_data: Optional[Dict[str, Any]] = {}