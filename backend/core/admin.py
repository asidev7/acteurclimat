from django.contrib import admin
from django.utils.html import format_html
from .models import (
    User, SubscriptionPlan, UserSubscription, Bookmaker, DailyCoupon,
    CouponSelection, UserStats, UserPreferences, UserCouponHistory,
    Notification, Transaction
)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'coins', 'created_at')
    list_filter = ('is_active', 'is_staff', 'created_at')
    search_fields = ('email', 'first_name', 'last_name', 'phone_number')
    readonly_fields = ('created_at',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informations personnelles', {'fields': ('first_name', 'last_name', 'phone_number', 'profile_picture')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Système', {'fields': ('coins', 'verification_token', 'created_at')}),
    )
    ordering = ('-created_at',)

@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'plan_type', 'price', 'duration_days', 'is_active')
    list_filter = ('plan_type', 'is_active')
    search_fields = ('name', 'description')

@admin.register(Bookmaker)
class BookmakerAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'display_logo')
    search_fields = ('name',)
    
    def display_logo(self, obj):
        if obj.logo:
            return format_html('<img src="{}" width="50" height="50" />', obj.logo.url)
        return "Aucun logo"
    
    display_logo.short_description = 'Logo'

class CouponSelectionInline(admin.TabularInline):
    model = CouponSelection
    extra = 1

@admin.register(DailyCoupon)
class DailyCouponAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'bookmaker', 'odds_value', 'risk_level', 'required_plan', 'is_validated', 'created_by')
    list_filter = ('date', 'risk_level', 'required_plan', 'is_validated', 'bookmaker')
    search_fields = ('title', 'description')
    inlines = [CouponSelectionInline]
    readonly_fields = ('created_at',)

@admin.register(CouponSelection)
class CouponSelectionAdmin(admin.ModelAdmin):
    list_display = ('match_description', 'coupon', 'competition', 'match_date', 'prediction_type', 'odds_value', 'is_won')
    list_filter = ('competition', 'prediction_type', 'is_won', 'match_date')
    search_fields = ('match_description', 'competition')

@admin.register(UserStats)
class UserStatsAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_coupons_followed', 'winning_coupons', 'losing_coupons', 'success_rate', 'total_profit')
    search_fields = ('user__email',)
    readonly_fields = ('total_coupons_followed', 'winning_coupons', 'losing_coupons', 'success_rate', 'total_profit')

@admin.register(UserPreferences)
class UserPreferencesAdmin(admin.ModelAdmin):
    list_display = ('user', 'receive_notifications', 'notification_time', 'risk_preference')
    list_filter = ('receive_notifications', 'risk_preference')
    search_fields = ('user__email',)
    filter_horizontal = ('favorite_bookmakers',)

@admin.register(UserCouponHistory)
class UserCouponHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'coupon', 'stake', 'potential_winnings', 'followed_at')
    list_filter = ('followed_at',)
    search_fields = ('user__email', 'coupon__title')
    readonly_fields = ('followed_at',)

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('user__email', 'title', 'message')
    readonly_fields = ('created_at',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'transaction_type', 'amount', 'description', 'created_at')
    list_filter = ('transaction_type', 'created_at')
    search_fields = ('user__email', 'description', 'reference_id')
    readonly_fields = ('created_at',)