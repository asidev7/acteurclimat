from rest_framework import serializers
from .models import *

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    """Serializer pour les plans d'abonnement"""
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'

class SubscriptionSerializer(serializers.ModelSerializer):
    """Serializer pour les abonnements"""
    days_remaining = serializers.SerializerMethodField()
    plan_details = SubscriptionPlanSerializer(source='plan', read_only=True)
    
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'plan', 'plan_details', 'start_date', 'end_date', 
                  'status', 'days_remaining', 'created_at', 'updated_at']
        read_only_fields = ['start_date', 'end_date', 'days_remaining', 'created_at', 'updated_at']
    
    def get_days_remaining(self, obj):
        """Calcule le nombre de jours restants dans l'abonnement"""
        if obj.status != 'active':
            return 0
        
        now = timezone.now()
        if now > obj.end_date:
            return 0
        
        delta = obj.end_date - now
        return delta.days
    
class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ['id', 'user', 'match_id', 'team1', 'team2', 'prediction_option', 'confidence', 'tips', 'created_at']
        read_only_fields = ['user', 'created_at']  # Ces champs ne peuvent pas être modifiés par l'utilisateur
        
        
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'first_name', 'last_name', 'email']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'transaction_id', 'description', 'amount', 'status', 'created_at', 'updated_at', 'payment_url', 'token', 'customer']
        