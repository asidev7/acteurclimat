from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import SubscriptionPlan, Subscription, Prediction,Transaction,Customer

# Enregistrement des modèles dans l'interface d'administration
admin.site.register(Transaction)
admin.site.register(Customer)
@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration_in_days', 'description')
    search_fields = ('name', 'description')
    list_filter = ('price', 'duration_in_days')

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'plan', 'start_date', 'end_date', 'status')
    search_fields = ('user__username', 'plan__name')
    list_filter = ('status', 'plan__name', 'start_date', 'end_date')
    date_hierarchy = 'start_date'

@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ('user', 'match_id', 'team1', 'team2', 'prediction_option', 'confidence', 'created_at')
    search_fields = ('user__username', 'match_id', 'team1', 'team2')
    list_filter = ('created_at', 'confidence')
    date_hierarchy = 'created_at'