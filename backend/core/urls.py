from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from .views import * 

from rest_framework.decorators import action

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
    permission_classes=[AllowAny],
)

# Créer un routeur
router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'plans', SubscriptionPlanViewSet)
router.register(r'subscriptions', UserSubscriptionViewSet, basename='subscription')

urlpatterns = [
    # Documentation API
    path('docs/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('docs/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # Authentification
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/change-password/', ChangePasswordView.as_view(), name='change-password'),
    
    # Profil utilisateur
    path('users/profile/', UserProfileView.as_view(), name='profile'),
    path('users/stats/', UserStatsView.as_view(), name='user-stats'),
    path('users/preferences/', UserPreferencesView.as_view(), name='user-preferences'),
    path('users/followed-coupons/', UserFollowedCouponsView.as_view(), name='user-followed-coupons'),
    path('users/notifications/', NotificationListView.as_view(), name='user-notifications'),
    path('users/notifications/<int:pk>/mark-read/', MarkNotificationReadView.as_view(), name='mark-notification-read'),
    path('users/transactions/', TransactionListView.as_view(), name='user-transactions'),
    path('users/dashboard/', UserDashboardView.as_view(), name='user-dashboard'),
    
    # Abonnements
    path('payment/moov-benin/', MoovBeninPaymentView.as_view(), name='moov-benin-payment'),
    path('payment/mtn-benin/', MTNBeninPaymentView.as_view(), name='mtn-benin-payment'),
    path('payment/callback/', PaymentCallbackView.as_view(), name='payment-callback'),

    # Coupons
    path('coupons/', DailyCouponListView.as_view(), name='coupon-list'),
    path('coupons/<int:pk>/', DailyCouponDetailView.as_view(), name='coupon-detail'),
    path('coupons/create/', DailyCouponCreateView.as_view(), name='coupon-create'),
    path('coupons/<int:pk>/update/', DailyCouponUpdateView.as_view(), name='coupon-update'),
    path('coupons/<int:pk>/follow/', FollowCouponView.as_view(), name='follow-coupon'),
    
    # Bookmakers
    path('bookmakers/', BookmakerListView.as_view(), name='bookmaker-list'),
    path('bookmakers/<int:pk>/', BookmakerDetailView.as_view(), name='bookmaker-detail'),
    
    # Router URLs
    path('', include(router.urls)),
]