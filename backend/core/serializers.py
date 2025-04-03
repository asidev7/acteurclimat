from rest_framework import serializers
from django.utils import timezone
from .models import (
    User, SubscriptionPlan, UserSubscription, 
    Bookmaker, DailyCoupon, CouponSelection,
    UserStats, UserPreferences, UserCouponHistory,
    Notification, Transaction
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active', 'phone_number', 'profile_picture', 'coins', 'created_at']
        read_only_fields = ['is_active', 'coins', 'created_at']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'phone_number']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_number', 'profile_picture']

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Le mot de passe actuel est incorrect.")
        return value

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'name', 'plan_type', 'price', 'duration_days', 'description', 'features', 'is_active']


class UserSubscriptionSerializer(serializers.ModelSerializer):
    plan_details = SubscriptionPlanSerializer(source='plan', read_only=True)
    
    class Meta:
        model = UserSubscription
        fields = ['id', 'user', 'plan', 'plan_details', 'status', 'reference_id', 
                  'transaction_id', 'invoice_token', 'start_date', 'end_date', 
                  'is_active', 'auto_renew']
        read_only_fields = ['reference_id', 'transaction_id', 'invoice_token', 'start_date', 'end_date']



class BookmakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmaker
        fields = '__all__'

class CouponSelectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CouponSelection
        fields = ['id', 'match_description', 'competition', 'match_date', 'prediction_type', 'odds_value', 'is_won']
        read_only_fields = ['is_won']

class DailyCouponSerializer(serializers.ModelSerializer):
    selections = CouponSelectionSerializer(many=True, read_only=True)
    bookmaker = BookmakerSerializer(read_only=True)
    bookmaker_id = serializers.PrimaryKeyRelatedField(
        write_only=True, 
        queryset=Bookmaker.objects.all(),
        source='bookmaker',
        required=False,
        allow_null=True
    )
    created_by = UserSerializer(read_only=True)
    
    class Meta:
        model = DailyCoupon
        fields = [
            'id', 'date', 'title', 'description', 'image', 
            'bookmaker', 'bookmaker_id', 'odds_value', 'risk_level', 
            'required_plan', 'is_validated', 'created_by', 
            'created_at', 'selections', 
        ]
        read_only_fields = ['is_validated', 'created_by', 'created_at']
    
    
class DailyCouponCreateSerializer(serializers.ModelSerializer):
    selections = CouponSelectionSerializer(many=True)
    
    class Meta:
        model = DailyCoupon
        fields = [
            'date', 'title', 'description', 'image', 
            'bookmaker', 'odds_value', 'risk_level', 
            'required_plan', 'selections'
        ]
    
    def create(self, validated_data):
        selections_data = validated_data.pop('selections')
        validated_data['created_by'] = self.context['request'].user
        
        coupon = DailyCoupon.objects.create(**validated_data)
        
        for selection_data in selections_data:
            CouponSelection.objects.create(coupon=coupon, **selection_data)
        
        return coupon

class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = '__all__'
        read_only_fields = ['user', 'total_coupons_followed', 'winning_coupons', 'losing_coupons', 'total_profit', 'success_rate']

class UserPreferencesSerializer(serializers.ModelSerializer):
    favorite_bookmakers = BookmakerSerializer(many=True, read_only=True)
    favorite_bookmaker_ids = serializers.PrimaryKeyRelatedField(
        queryset=Bookmaker.objects.all(),
        write_only=True,
        source='favorite_bookmakers',
        many=True,
        required=False
    )
    
    class Meta:
        model = UserPreferences
        fields = ['receive_notifications', 'notification_time', 'favorite_bookmakers', 'favorite_bookmaker_ids', 'risk_preference']

class UserCouponHistorySerializer(serializers.ModelSerializer):
    coupon = DailyCouponSerializer(read_only=True)
    
    class Meta:
        model = UserCouponHistory
        fields = ['id', 'coupon', 'stake', 'potential_winnings', 'followed_at']
        read_only_fields = ['followed_at']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'is_read', 'created_at']
        read_only_fields = ['created_at']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'transaction_type', 'amount', 'description', 'reference_id', 'created_at']
        read_only_fields = ['created_at']

# Serializer pour le tableau de bord utilisateur
class UserDashboardSerializer(serializers.Serializer):
    user = UserSerializer(read_only=True)
    subscription = UserSubscriptionSerializer(read_only=True)
    stats = UserStatsSerializer(read_only=True)
    preferences = UserPreferencesSerializer(read_only=True)
    recent_coupons = DailyCouponSerializer(many=True, read_only=True)
    followed_coupons = UserCouponHistorySerializer(many=True, read_only=True)
    unread_notifications_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        fields = ['user', 'subscription', 'stats', 'preferences', 'recent_coupons', 'followed_coupons', 'unread_notifications_count']