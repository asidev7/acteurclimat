from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.send_verification_email()
        return user



from rest_framework import serializers
from .models import FAQ


class FAQSerializer(serializers.ModelSerializer):
    """Serializer for the FAQ model."""
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order", "is_active", "created_at", "updated_at"]


class FAQListSerializer(serializers.ModelSerializer):
    """Simplified serializer for listing FAQs."""
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order"]



