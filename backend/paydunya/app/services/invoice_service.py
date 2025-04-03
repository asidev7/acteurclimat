"""
Service pour les opérations liées aux factures
"""
from app.core.api_client import PaydunyaClient
from app.models.base import CreateInvoiceRequest

class InvoiceService:
    """Service pour gérer les factures PayDunya"""
    
    @staticmethod
    async def create_invoice(request: CreateInvoiceRequest):
        """
        Créer une nouvelle facture PayDunya
        
        Args:
            request: Données de la facture à créer
            
        Returns:
            La réponse de l'API PayDunya
        """
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
        
        return PaydunyaClient.post("checkout-invoice/create", payload)