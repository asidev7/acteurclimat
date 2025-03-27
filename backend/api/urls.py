from django.urls import path, include, re_path
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from .views import *

# Création du routeur
router = DefaultRouter()
router.register(r'subscription-plans', SubscriptionPlanViewSet)
router.register(r'subscriptions', SubscriptionViewSet, basename='subscription')
router.register(r'predictions', PredictionViewSet, basename='prediction')

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

urlpatterns = [
    path('', include(router.urls)),

    # URLs de Swagger
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/customers/', create_customer, name='create_customer'),
    path('api/transactions/', create_transaction, name='create_transaction'),
    path('api/transactions/<int:transaction_id>/token/', generate_payment_link, name='generate_payment_link'),

    ]