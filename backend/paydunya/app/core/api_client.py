"""
Client API pour communiquer avec PayDunya
"""
import requests
from fastapi import HTTPException
from app.config.settings import (
    PAYDUNYA_MASTER_KEY,
    PAYDUNYA_PRIVATE_KEY, 
    PAYDUNYA_TOKEN,
    PAYDUNYA_BASE_URL
)

class PaydunyaClient:
    """Client pour les appels à l'API PayDunya"""
    
    @staticmethod
    def get_headers():
        """Obtenir les en-têtes pour les requêtes à l'API PayDunya"""
        return {
            "Content-Type": "application/json",
            "PAYDUNYA-MASTER-KEY": PAYDUNYA_MASTER_KEY,
            "PAYDUNYA-PRIVATE-KEY": PAYDUNYA_PRIVATE_KEY,
            "PAYDUNYA-TOKEN": PAYDUNYA_TOKEN
        }
    
    @staticmethod
    def post(endpoint: str, payload: dict):
        """
        Effectuer une requête POST à l'API PayDunya
        
        Args:
            endpoint: Point de terminaison API (sans l'URL de base)
            payload: Données à envoyer
            
        Returns:
            La réponse JSON de l'API
            
        Raises:
            HTTPException: En cas d'erreur de communication avec l'API
        """
        url = f"{PAYDUNYA_BASE_URL}/{endpoint}"
        
        try:
            response = requests.post(url, json=payload, headers=PaydunyaClient.get_headers())
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Erreur de communication avec PayDunya: {str(e)}")