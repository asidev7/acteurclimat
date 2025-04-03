from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.conf import settings
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework.decorators import action
from rest_framework.decorators import action

from django.contrib.auth import authenticate
from django.db.models import Q, Count
from .serializers import *
from .models import *
import uuid
import json
import logging

logger = logging.getLogger(__name__)

# ===== Vues d'authentification et de gestion des utilisateurs =====

class RegisterView(generics.CreateAPIView):
    """Vue pour l'inscription d'un nouvel utilisateur"""
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Créer les objets liés à l'utilisateur
            UserStats.objects.create(user=user)
            UserPreferences.objects.create(user=user)
            
            return Response({
                'message': 'Inscription réussie. Veuillez vérifier votre email pour activer votre compte.',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView):
    """Vue pour vérifier l'email d'un utilisateur après inscription"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        token = request.query_params.get('token')
        if not token:
            return Response({'error': 'Token manquant'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(verification_token=token, is_active=False)
            user.is_active = True
            user.verification_token = None
            user.save()
            return Response({'message': 'Compte activé avec succès. Vous pouvez maintenant vous connecter.'})

        except User.DoesNotExist:
            logger.warning(f"Tentative de vérification avec un token invalide : {token}")
            return Response({'error': 'Token invalide ou compte déjà activé'}, status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(APIView):
    """Vue pour la connexion d'un utilisateur"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Email et mot de passe requis'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(email=email, password=password)
        
        if not user:
            return Response({'error': 'Identifiants invalides'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if not user.is_active:
            return Response({'error': 'Compte non activé. Veuillez vérifier votre email.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Utiliser TokenObtainPairView pour la gestion des tokens JWT
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })

class UserProfileView(generics.RetrieveUpdateAPIView):
    """Vue pour récupérer et mettre à jour le profil utilisateur"""
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileUpdateSerializer
    
    def get_object(self):
        return self.request.user
    
    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class ChangePasswordView(generics.UpdateAPIView):
    """Vue pour changer le mot de passe"""
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
    
    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = self.request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'message': 'Mot de passe modifié avec succès'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    """ViewSet pour les utilisateurs (admin)"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

# ===== Vues pour les abonnements =====


class SubscriptionPlanListView(generics.ListCreateAPIView):
    """Vue pour lister les plans d'abonnement disponibles et en créer un nouveau"""
    queryset = SubscriptionPlan.objects.filter(is_active=True)  # Afficher les plans actifs
    serializer_class = SubscriptionPlanSerializer  # Serializer à utiliser pour la réponse
    permission_classes = [permissions.AllowAny]  # Permet d'accéder à cette API sans authentification

    def perform_create(self, serializer):
        """Permet de créer un plan d'abonnement"""
        serializer.save()


# Configurations PayDunya
PAYDUNYA_MASTER_KEY = "wQzk9ZwR-Qq9m-0hD0-zpud-je5coGC3FHKW"  # Remplacez par votre clé
PAYDUNYA_PRIVATE_KEY = "live_private_rMIdJM3PLLhLjyArx9tF3VURAF5"  # Ou utilisez test_private_... pour les tests
PAYDUNYA_TOKEN = "IivOiOxGJuWhc5znlIiK"  # Remplacez par votre token
PAYDUNYA_BASE_URL = "https://app.paydunya.com/api/v1"  # Utilisez sandbox-api pour les tests


class SubscriptionPlanViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint pour consulter les plans d'abonnement disponibles.
    """
    queryset = SubscriptionPlan.objects.filter(is_active=True)
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserSubscriptionViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour gérer les abonnements des utilisateurs.
    """
    serializer_class = UserSubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Retourne uniquement les abonnements de l'utilisateur connecté."""
        return UserSubscription.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """
        Crée un nouvel abonnement et initialise le processus de paiement.
        """
        # Génération d'une référence unique
        reference_id = f"SUB-{uuid.uuid4().hex[:10].upper()}"
        
        # Sauvegarde de l'abonnement avec le statut en attente
        subscription = serializer.save(
            user=self.request.user, 
            reference_id=reference_id,
            status=UserSubscription.PENDING
        )
        
        # Calculer la date de fin basée sur la durée du plan
        end_date = timezone.now() + timedelta(days=subscription.plan.duration_days)
        subscription.end_date = end_date
        subscription.save()
        
        # Création de la facture PayDunya
        self.create_payment_invoice(subscription)
    
    @action(detail=True, methods=['post'])
    def initiate_payment(self, request, pk=None):
        """
        Initie ou réinitie le processus de paiement pour un abonnement.
        """
        subscription = self.get_object()
        
        # Vérifier si l'abonnement est déjà actif
        if subscription.status == UserSubscription.ACTIVE:
            return Response(
                {"error": "Cet abonnement est déjà actif."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Créer une nouvelle facture de paiement
        payment_url = self.create_payment_invoice(subscription)
        
        return Response({
            "payment_url": payment_url,
            "invoice_token": subscription.invoice_token
        })
    
    @action(detail=True, methods=['post'])
    def check_payment_status(self, request, pk=None):
        """
        Vérifie le statut d'un paiement en cours pour un abonnement.
        """
        subscription = self.get_object()
        
        if not subscription.invoice_token:
            return Response(
                {"error": "Aucune facture associée à cet abonnement."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        payment_status = self.check_paydunya_status(subscription.invoice_token)
        
        # Mise à jour du statut de l'abonnement si le paiement est complété
        if payment_status.get("status") == "completed":
            subscription.status = UserSubscription.ACTIVE
            subscription.transaction_id = payment_status.get("transaction_id", "")
            subscription.save()
            
            # Mettre à jour la transaction associée
            Transaction.objects.filter(invoice_token=subscription.invoice_token).update(
                status=Transaction.COMPLETED,
                transaction_id=payment_status.get("transaction_id", ""),
                payment_details=payment_status
            )
        
        return Response(payment_status)
    
    @action(detail=True, methods=['post'])
    def cancel_subscription(self, request, pk=None):
        """
        Annule un abonnement actif.
        """
        subscription = self.get_object()
        
        if subscription.status != UserSubscription.ACTIVE:
            return Response(
                {"error": "Seul un abonnement actif peut être annulé."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        subscription.cancel()
        
        return Response({"status": "Abonnement annulé avec succès."})
    
    def create_payment_invoice(self, subscription):
        """
        Crée une facture de paiement avec PayDunya et retourne l'URL de paiement.
        """
        plan = subscription.plan
        
        # Préparer les données pour PayDunya
        payload = {
            "invoice": {
                "items": {
                    "item_0": {
                        "name": f"Abonnement {plan.name}",
                        "quantity": 1,
                        "unit_price": str(plan.price),
                        "total_price": str(plan.price),
                        "description": plan.description
                    }
                },
                "total_amount": float(plan.price),
                "description": f"Paiement pour abonnement {plan.name} - {plan.duration_days} jours"
            },
            "store": {
                "name": "Votre Service d'Abonnement"
            },
            "custom_data": {
                "subscription_id": subscription.id,
                "user_id": subscription.user.id,
                "reference_id": subscription.reference_id
            },
            "actions": {
                "callback_url": f"{settings.BASE_URL}/api/payment/callback/",
                "return_url": f"{settings.FRONTEND_URL}/subscriptions/success/",
                "cancel_url": f"{settings.FRONTEND_URL}/subscriptions/cancel/"
            }
        }
        
        # Entêtes pour PayDunya
        headers = {
            "Content-Type": "application/json",
            "PAYDUNYA-MASTER-KEY": PAYDUNYA_MASTER_KEY,
            "PAYDUNYA-PRIVATE-KEY": PAYDUNYA_PRIVATE_KEY,
            "PAYDUNYA-TOKEN": PAYDUNYA_TOKEN
        }
        
        # Appel à l'API PayDunya
        response = requests.post(
            f"{PAYDUNYA_BASE_URL}/checkout-invoice/create",
            headers=headers,
            data=json.dumps(payload)
        )
        
        data = response.json()
        
        if response.status_code == 200 and data.get("response_code") == "00":
            # Sauvegarde du token de facture dans l'abonnement
            invoice_token = data.get("token")
            subscription.invoice_token = invoice_token
            subscription.save()
            
            # Création d'une transaction associée
            Transaction.objects.create(
                user=subscription.user,
                subscription=subscription,
                amount=plan.price,
                invoice_token=invoice_token,
                status=Transaction.PENDING
            )
            
            # URL de paiement
            payment_url = data.get("response_text")
            return payment_url
        
        raise Exception(f"Erreur lors de la création de la facture: {data}")
    
    def check_paydunya_status(self, invoice_token):
        """
        Vérifie le statut d'une facture PayDunya.
        """
        headers = {
            "Content-Type": "application/json",
            "PAYDUNYA-MASTER-KEY": PAYDUNYA_MASTER_KEY,
            "PAYDUNYA-PRIVATE-KEY": PAYDUNYA_PRIVATE_KEY,
            "PAYDUNYA-TOKEN": PAYDUNYA_TOKEN
        }
        
        response = requests.get(
            f"{PAYDUNYA_BASE_URL}/checkout-invoice/confirm/{invoice_token}",
            headers=headers
        )
        
        data = response.json()
        
        if response.status_code == 200 and data.get("response_code") == "00":
            return {
                "status": data.get("status"),
                "transaction_id": data.get("transaction_id", ""),
                "customer": data.get("customer", {}),
                "receipt_url": data.get("receipt_url", "")
            }
        
        return {"status": "error", "message": data.get("response_text", "Erreur inconnue")}



class MoovBeninPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        invoice_token = request.data.get("invoice_token")
        phone_number = request.data.get("phone_number")
        
        if not invoice_token or not phone_number:
            return Response(
                {"error": "Le token de facture et le numéro de téléphone sont requis."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Trouver la transaction associée
        try:
            transaction = Transaction.objects.get(invoice_token=invoice_token)
        except Transaction.DoesNotExist:
            return Response(
                {"error": "Transaction non trouvée."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Données pour Moov Benin
        payload = {
            "moov_benin_customer_fullname": f"{request.user.first_name} {request.user.last_name}",
            "moov_benin_email": request.user.email,
            "moov_benin_phone_number": phone_number,
            "payment_token": invoice_token
        }
        
        # Entêtes pour PayDunya
        headers = {
            "Content-Type": "application/json",
            "PAYDUNYA-MASTER-KEY": PAYDUNYA_MASTER_KEY,
            "PAYDUNYA-PRIVATE-KEY": PAYDUNYA_PRIVATE_KEY,
            "PAYDUNYA-TOKEN": PAYDUNYA_TOKEN
        }
        
        # Appel à l'API PayDunya pour Moov Benin
        response = requests.post(
            f"{PAYDUNYA_BASE_URL}/softpay/moov-benin",
            headers=headers,
            data=json.dumps(payload)
        )
        
        data = response.json()
        
        # Mise à jour de la transaction
        transaction.payment_method = "MOOV_BENIN"
        transaction.payment_phone = phone_number
        transaction.payment_details.update(data)
        transaction.save()
        
        return Response(data)


class MTNBeninPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        invoice_token = request.data.get("invoice_token")
        phone_number = request.data.get("phone_number")
        
        if not invoice_token or not phone_number:
            return Response(
                {"error": "Le token de facture et le numéro de téléphone sont requis."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Trouver la transaction associée
        try:
            transaction = Transaction.objects.get(invoice_token=invoice_token)
        except Transaction.DoesNotExist:
            return Response(
                {"error": "Transaction non trouvée."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Données pour MTN Benin
        payload = {
            "mtn_benin_customer_fullname": f"{request.user.first_name} {request.user.last_name}",
            "mtn_benin_email": request.user.email,
            "mtn_benin_phone_number": phone_number,
            "mtn_benin_wallet_provider": "MTNBENIN",
            "payment_token": invoice_token
        }
        
        # Entêtes pour PayDunya
        headers = {
            "Content-Type": "application/json",
            "PAYDUNYA-MASTER-KEY": PAYDUNYA_MASTER_KEY,
            "PAYDUNYA-PRIVATE-KEY": PAYDUNYA_PRIVATE_KEY,
            "PAYDUNYA-TOKEN": PAYDUNYA_TOKEN
        }
        
        # Appel à l'API PayDunya pour MTN Benin
        response = requests.post(
            f"{PAYDUNYA_BASE_URL}/softpay/mtn-benin",
            headers=headers,
            data=json.dumps(payload)
        )
        
        data = response.json()
        
        # Mise à jour de la transaction
        transaction.payment_method = "MTN_BENIN"
        transaction.payment_phone = phone_number
        transaction.payment_details.update(data)
        transaction.save()
        
        return Response(data)


# PaymentCallbackView pour gérer les IPN (Notifications de paiement instantanées)
class PaymentCallbackView(APIView):
    permission_classes = []  # Pas d'authentification requise pour les callbacks
    
    def post(self, request):
        # Récupérer les données de la notification
        data = request.data
        
        # Vérifier le token de facture
        invoice_token = data.get("token")
        if not invoice_token:
            return Response({"status": "error", "message": "Token de facture manquant"}, status=400)
        
        # Trouver la transaction associée
        try:
            transaction = Transaction.objects.get(invoice_token=invoice_token)
            subscription = transaction.subscription
        except (Transaction.DoesNotExist, UserSubscription.DoesNotExist):
            return Response({"status": "error", "message": "Transaction ou abonnement non trouvé"}, status=404)
        
        # Mettre à jour le statut selon la notification
        payment_status = data.get("status")
        if payment_status == "completed":
            transaction.status = Transaction.COMPLETED
            subscription.status = UserSubscription.ACTIVE
        elif payment_status == "cancelled":
            transaction.status = Transaction.CANCELLED
            subscription.status = UserSubscription.CANCELED
        elif payment_status == "failed":
            transaction.status = Transaction.FAILED
            
        # Sauvegarder les détails de la transaction
        transaction.payment_details = data
        transaction.save()
        
        # Mise à jour de l'abonnement
        if payment_status == "completed":
            subscription.activate()
        elif payment_status in ["cancelled", "failed"]:
            subscription.cancel()
        
        return Response({"status": "success"})





class DailyCouponListView(generics.ListAPIView):
    """Vue pour lister les coupons quotidiens"""
    serializer_class = DailyCouponSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = DailyCoupon.objects.filter(
            date__gte=timezone.now().date() - timezone.timedelta(days=7)
        ).order_by('-date')
        
        # Filtrage par date
        date = self.request.query_params.get('date')
        if date:
            queryset = queryset.filter(date=date)
        
        # Filtrage par niveau d'abonnement
        plan_type = self.request.query_params.get('plan_type')
        if plan_type:
            queryset = queryset.filter(required_plan=plan_type)
        
        # Filtrage par niveau de risque
        risk_level = self.request.query_params.get('risk_level')
        if risk_level:
            queryset = queryset.filter(risk_level=risk_level)
        
        return queryset
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class DailyCouponDetailView(generics.RetrieveAPIView):
    """Vue pour récupérer les détails d'un coupon quotidien"""
    queryset = DailyCoupon.objects.all()
    serializer_class = DailyCouponSerializer
    permission_classes = [AllowAny]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class DailyCouponCreateView(generics.CreateAPIView):
    """Vue pour créer un nouveau coupon quotidien (admin seulement)"""
    serializer_class = DailyCouponCreateSerializer
    permission_classes = [IsAdminUser]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class DailyCouponUpdateView(generics.UpdateAPIView):
    """Vue pour mettre à jour un coupon existant (admin seulement)"""
    queryset = DailyCoupon.objects.all()
    serializer_class = DailyCouponCreateSerializer
    permission_classes = [IsAdminUser]

class FollowCouponView(APIView):
    """Vue pour suivre un coupon"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, pk):
        coupon = get_object_or_404(DailyCoupon, pk=pk)
        
        # Vérifier si l'utilisateur a accès à ce coupon
        if not self._check_coupon_access(request.user, coupon):
            return Response({'error': 'Vous n\'avez pas accès à ce coupon'}, status=status.HTTP_403_FORBIDDEN)
        
        # Vérifier si l'utilisateur suit déjà ce coupon
        if UserCouponHistory.objects.filter(user=request.user, coupon=coupon).exists():
            return Response({'error': 'Vous suivez déjà ce coupon'}, status=status.HTTP_400_BAD_REQUEST)
        
        stake = request.data.get('stake', 0)
        
        # Créer l'historique de suivi
        history = UserCouponHistory.objects.create(
            user=request.user,
            coupon=coupon,
            stake=stake,
            potential_winnings=stake * coupon.odds_value
        )
        
        # Mettre à jour les statistiques utilisateur
        user_stats = UserStats.objects.get(user=request.user)
        user_stats.total_coupons_followed += 1
        user_stats.save()
        
        return Response({
            'message': 'Coupon suivi avec succès',
            'coupon': DailyCouponSerializer(coupon, context={'request': request}).data,
            'stake': stake,
            'potential_winnings': stake * coupon.odds_value
        })
    
    def _check_coupon_access(self, user, coupon):
        try:
            subscription = user.subscription
            if not subscription.is_subscription_active():
                return coupon.required_plan == 'basic'
            
            plan_hierarchy = {'basic': 0, 'premium': 1, 'vip': 2}
            user_plan = subscription.plan.plan_type
            required_plan = coupon.required_plan
            
            return plan_hierarchy.get(user_plan, 0) >= plan_hierarchy.get(required_plan, 0)
        except UserSubscription.DoesNotExist:
            return coupon.required_plan == 'basic'

# ===== Vues pour le profil utilisateur et les préférences =====

class UserStatsView(generics.RetrieveAPIView):
    """Vue pour récupérer les statistiques de l'utilisateur"""
    serializer_class = UserStatsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return UserStats.objects.get_or_create(user=self.request.user)

class UserPreferencesView(generics.RetrieveUpdateAPIView):
    """Vue pour récupérer et mettre à jour les préférences de l'utilisateur"""
    serializer_class = UserPreferencesSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return UserPreferences.objects.get_or_create(user=self.request.user)

class UserFollowedCouponsView(generics.ListAPIView):
    """Vue pour lister les coupons suivis par l'utilisateur"""
    serializer_class = UserCouponHistorySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserCouponHistory.objects.filter(user=self.request.user).order_by('-followed_at')

class NotificationListView(generics.ListAPIView):
    """Vue pour lister les notifications de l'utilisateur"""
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

class MarkNotificationReadView(generics.UpdateAPIView):
    """Vue pour marquer une notification comme lue"""
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        notification = get_object_or_404(Notification, pk=pk, user=request.user)
        notification.is_read = True
        notification.save()
        return Response({'message': 'Notification marquée comme lue'})

class TransactionListView(generics.ListAPIView):
    """Vue pour lister les transactions de l'utilisateur"""
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-created_at')

# ===== Vue tableau de bord utilisateur =====

class UserDashboardView(APIView):
    """Vue pour récupérer toutes les données du tableau de bord utilisateur"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Récupérer l'abonnement
        try:
            subscription = UserSubscription.objects.get(user=user)
        except UserSubscription.DoesNotExist:
            subscription = None
        
        # Récupérer les statistiques
        stats = UserStats.objects.get_or_create(user=user)
        
        # Récupérer les préférences
        preferences = UserPreferences.objects.get_or_create(user=user)
        
        # Récupérer les derniers coupons (accessibles à l'utilisateur)
        recent_coupons = []
        all_coupons = DailyCoupon.objects.filter(
            date__gte=timezone.now().date() - timezone.timedelta(days=3)
        ).order_by('-date')[:5]
        
        for coupon in all_coupons:
            serializer = DailyCouponSerializer(coupon, context={'request': request})
            if serializer.data['is_accessible']:
                recent_coupons.append(coupon)
        
        # Récupérer les coupons suivis
        followed_coupons = UserCouponHistory.objects.filter(user=user).order_by('-followed_at')[:5]
        
        # Compter les notifications non lues
        unread_notifications_count = Notification.objects.filter(user=user, is_read=False).count()
        
        # Préparer les données pour le sérialiseur
        dashboard_data = {
            'user': user,
            'subscription': subscription,
            'stats': stats,
            'preferences': preferences,
            'recent_coupons': recent_coupons,
            'followed_coupons': followed_coupons,
            'unread_notifications_count': unread_notifications_count
        }
        
        # Sérialiser et retourner les données
        serializer = UserDashboardSerializer(dashboard_data, context={'request': request})
        return Response(serializer.data)

# ===== Vues pour les bookmakers =====

class BookmakerListView(generics.ListAPIView):
    """Vue pour lister les bookmakers disponibles"""
    queryset = Bookmaker.objects.all()
    serializer_class = BookmakerSerializer
    permission_classes = [AllowAny]

class BookmakerDetailView(generics.RetrieveAPIView):
    """Vue pour récupérer les détails d'un bookmaker"""
    queryset = Bookmaker.objects.all()
    serializer_class = BookmakerSerializer
    permission_classes = [AllowAny]