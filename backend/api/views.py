from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import *
from .serializers import SubscriptionPlanSerializer, SubscriptionSerializer
from rest_framework import serializers
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import json



class SubscriptionPlanViewSet(viewsets.ModelViewSet):
    """ViewSet pour gérer les plans d'abonnement (lecture et écriture)"""
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer
    # Permission supprimée pour permettre l'accès public
    permission_classes = []  # Liste vide = pas de restriction
    
    # Si vous souhaitez restreindre certaines actions seulement
    def get_permissions(self):
        """
        Actions de lecture (list, retrieve) accessibles à tous
        Actions d'écriture (create, update, delete) réservées aux admins
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Optionnel: seulement les admins peuvent modifier
            return [permissions.IsAdminUser()]
        return []  # Au
    
class SubscriptionViewSet(viewsets.ModelViewSet):
    """ViewSet pour gérer les abonnements"""
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Limite les abonnements à ceux de l'utilisateur connecté"""
        user = self.request.user
        return Subscription.objects.filter(user=user)
    
    def perform_create(self, serializer):
        """Crée un nouvel abonnement pour l'utilisateur courant"""
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def renew(self, request, pk=None):
        """Renouvelle un abonnement existant"""
        subscription = self.get_object()
        subscription.renew()
        serializer = self.get_serializer(subscription)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Annule un abonnement existant"""
        subscription = self.get_object()
        subscription.cancel()
        serializer = self.get_serializer(subscription)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def change_plan(self, request, pk=None):
        """Change le plan d'un abonnement existant"""
        subscription = self.get_object()
        
        try:
            new_plan_id = request.data.get('plan_id')
            new_plan = SubscriptionPlan.objects.get(id=new_plan_id)
        except (KeyError, SubscriptionPlan.DoesNotExist):
            return Response(
                {"error": "Plan d'abonnement non valide."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        subscription.change_plan(new_plan)
        serializer = self.get_serializer(subscription)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def check_status(self, request, pk=None):
        """Vérifie le statut d'un abonnement et le met à jour si nécessaire"""
        subscription = self.get_object()
        
        if subscription.status == 'active' and subscription.is_expired():
            subscription.status = 'expired'
            subscription.save()
        
        serializer = self.get_serializer(subscription)
        return Response(serializer.data)
    
    
class PredictionViewSet(viewsets.ModelViewSet):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
    permission_classes = [permissions.IsAuthenticated]  # Seuls les utilisateurs connectés peuvent accéder

    @action(detail=False, methods=['post'])
    def save_prediction(self, request):
        """
        Action personnalisée pour enregistrer une prédiction.
        """
        user = request.user
        data = request.data

        # Valider et enregistrer la prédiction
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response({'status': 'success', 'message': 'Prédiction enregistrée avec succès.'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'error', 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    
    # Remplacez <token> par votre jeton d'authentification FedaPay
API_TOKEN = settings.FEDAPAY_API_TOKEN  # Le token API FedaPay
BASE_URL = "https://api.fedapay.com/v1"

# Fonction pour créer un client
@api_view(['POST'])
def create_customer(request):
    url = f"{BASE_URL}/customers"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }

    customer_data = {
        "firstname": request.data.get("firstname"),
        "lastname": request.data.get("lastname"),
        "email": request.data.get("email")
        # Vous n'avez pas besoin d'envoyer 'phone_number'
    }

    try:
        # Requête à l'API FedaPay pour créer le client
        response = requests.post(url, headers=headers, data=json.dumps(customer_data))

        if response.status_code == 201:
            # Si la création du client réussit, on enregistre le client dans la base de données
            customer_data = response.json()

            # Créer le client lié à l'utilisateur
            user = request.user  # On récupère l'utilisateur connecté
            customer = Customer.objects.create(
                user=user,
                first_name=customer_data["firstname"],
                last_name=customer_data["lastname"],
                email=customer_data["email"]
            )

            # Sérialiser le client et retourner la réponse
            serializer = CustomerSerializer(customer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(response.json(), status=response.status_code)

    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Fonction pour créer une transaction
@api_view(['POST'])
def create_transaction(request):
    url = f"{BASE_URL}/transactions"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }

    transaction_data = {
        "description": request.data.get("description"),
        "amount": request.data.get("amount"),
        "currency": request.data.get("currency"),
        "callback_url": request.data.get("callback_url"),
        "metadata": request.data.get("metadata"),
        "customer": request.data.get("customer_id"),
        "fees": request.data.get("fees")
    }

    try:
        # Envoi de la requête à l'API FedaPay pour créer la transaction
        response = requests.post(url, headers=headers, data=json.dumps(transaction_data))

        if response.status_code == 201:
            transaction_data = response.json()
            customer = Customer.objects.get(id=transaction_data["customer"]["id"])

            # Sauvegarde de la transaction dans la base de données
            transaction = Transaction.objects.create(
                transaction_id=transaction_data["id"],
                description=transaction_data["description"],
                amount=transaction_data["amount"],
                status=transaction_data["status"],
                customer=customer
            )

            # Sérialiser la transaction et retourner la réponse
            return Response(transaction_data, status=status.HTTP_201_CREATED)
        else:
            return Response(response.json(), status=response.status_code)

    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# Fonction pour générer un lien de paiement
@api_view(['POST'])
def generate_payment_link(request, transaction_id):
    url = f"{BASE_URL}/transactions/{transaction_id}/token"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}"
    }

    try:
        response = requests.post(url, headers=headers)

        if response.status_code == 200:
            payment_data = response.json()
            transaction = Transaction.objects.get(transaction_id=transaction_id)
            transaction.token = payment_data["token"]
            transaction.payment_url = payment_data["url"]
            transaction.save()

            return Response(payment_data, status=status.HTTP_200_OK)
        else:
            return Response(response.json(), status=response.status_code)

    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)