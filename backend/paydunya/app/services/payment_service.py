"""
Service pour les opérations de paiement
"""
from app.core.api_client import PaydunyaClient

class PaymentService:
    """Service pour gérer les paiements via PayDunya"""
    
    @staticmethod
    async def process_payment(endpoint: str, payload: dict):
        """
        Traiter une demande de paiement générique
        
        Args:
            endpoint: Point de terminaison API pour le moyen de paiement
            payload: Données à envoyer
            
        Returns:
            La réponse de l'API PayDunya
        """
        return PaydunyaClient.post(endpoint, payload)