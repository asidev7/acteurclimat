from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from rest_framework.permissions import IsAdminUser

class CustomUserAdmin(UserAdmin):
    # Define the fields to display in the admin list view
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'created_at')
    list_filter = ('is_active', 'is_staff', 'created_at')
    search_fields = ('email', 'first_name', 'last_name')

    # Define the fieldsets for the add and change forms
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        # Removed 'created_at' from fieldsets because it's non-editable
    )

    # Define the fieldsets for the add form
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )

    # Define ordering for the list view
    ordering = ('email',)

# Register the User model with the CustomUserAdmin class
admin.site.register(User, CustomUserAdmin)