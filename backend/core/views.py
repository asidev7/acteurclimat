from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model  # Utilisez get_user_model() pour obtenir le modèle User personnalisé
from .serializers import RegisterSerializer, UserSerializer
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import FAQ
from .serializers import FAQSerializer, FAQListSerializer
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend


# Obtenez le modèle User personnalisé
User = get_user_model()
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email et mot de passe requis"}, status=status.HTTP_400_BAD_REQUEST)

        # Utilisez le modèle User personnalisé pour l'authentification
        try:
            user = User.objects.get(email=email)  # Récupérez l'utilisateur par email
            
            # Vérifiez directement le mot de passe au lieu d'utiliser authenticate
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                })
            else:
                return Response({"error": "Mot de passe incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
                
        except User.DoesNotExist:
            return Response({"error": "Utilisateur non trouvé"}, status=status.HTTP_404_NOT_FOUND)
        
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.query_params.get('token')
        if not token:
            return Response({'error': 'Token manquant'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Décoder le token
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            
            # Récupérer l'utilisateur
            user = User.objects.get(id=user_id)
            
            # Activer l'utilisateur
            user.is_active = True
            user.save()
            
            return Response({'message': 'Email vérifié avec succès !'}, status=status.HTTP_200_OK)
        
        except TokenError:
            return Response({'error': 'Token invalide'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        
class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les utilisateurs.
    """
    queryset = User.objects.all()  # Récupère tous les utilisateurs
    serializer_class = UserSerializer  # Utilise le sérialiseur UserSerializer

    # Permissions personnalisées
    def get_permissions(self):
        """
        Définit les permissions en fonction de l'action.
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]  # Seuls les utilisateurs authentifiés peuvent lire
        else:
            permission_classes = [IsAdminUser]  # Seuls les administrateurs peuvent créer, mettre à jour ou supprimer
        return [permission() for permission in permission_classes]
        
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class FAQViewSet(viewsets.ModelViewSet):
    """ViewSet for the FAQ model."""
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["is_active"]
    search_fields = ["question", "answer"]
    ordering_fields = ["order", "created_at", "updated_at"]

    def get_queryset(self):
        """Return filtered queryset based on is_active for non-staff users."""
        queryset = FAQ.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_active=True)
        return queryset

    def get_serializer_class(self):
        """Return appropriate serializer class."""
        if self.action == "list":
            return FAQListSerializer
        return self.serializer_class
