"""
Routes pour les opérations de facture
"""
from fastapi import APIRouter
from app.models.base import CreateInvoiceRequest
from app.services.invoice_service import InvoiceService

router = APIRouter(prefix="/invoice", tags=["Factures"])

@router.post("/create")
async def create_invoice(request: CreateInvoiceRequest):
    """Créer une facture PayDunya"""
    return await InvoiceService.create_invoice(request)