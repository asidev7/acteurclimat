from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, VerifyEmailView, LoginView, UserProfileView, UserViewSet,FAQViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from rest_framework import routers
from api.views import *
# Configuration de Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="Football API",
        default_version='v1',
        description="API pour accéder aux données de football et gérer les abonnements",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

# API BetIA (Exemple)
def betia_api(request):
    return JsonResponse({"message": "Bienvenue sur l'API BetIA ! 🚀"})

# Créer un routeur
router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')  # Enregistrer le ViewSet pour les utilisateurs
router.register(r"faqs", FAQViewSet, basename="faq")


urlpatterns = [
    # Authentification
    path('register/', RegisterView.as_view(), name='register'),
    path('api/users/verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='login'),  # ✅ Route de connexion
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/profile/', UserProfileView.as_view(), name='profile'),

    # Documentation Swagger & ReDoc
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Routes du routeur
    path('', include(router.urls)),  # Inclure les routes du routeur
]