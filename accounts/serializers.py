from rest_framework import serializers
from .models import User
import re
from .models import EmailVerificationToken

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'role']

    def validate(self, attrs):

        username_pattern = re.compile(r'^[a-zA-Z][\w]{6,23}')
        password_pattern = re.compile(r'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
       
        username = attrs.get('username', '')
        password = attrs.get('password', '')

        if not username_pattern.search(username):
            raise serializers.ValidationError(detail="Username must start with alphabet character and must be a length between 6 and 24 characters")
        if not password_pattern.search(password):
            raise serializers.ValidationError(detail="Password must be at least 8 characters long and must include at least an uppercase letter, a lowercase letters, a number, and a special character")
        
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create_user(
            **validated_data,
            is_verified=False  # Add this field for email verification
        )
        # Create and send verification token
        # verification_token = EmailVerificationToken.create_token(user)
        user.send_verification_email()
        return user
        # return User.objects.create_user(**validated_data)
    

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'role', 'is_verified']
        read_only_fields = ['id', 'is_verified']



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'role', 'is_verified']
        read_only_fields = ['id', 'is_verified']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep.pop("password", None)  # Safely remove password if it exists
        return rep
    
class EmailVerificationSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=64)

    def validate_token(self, value):
        if not EmailVerificationToken.objects.filter(token=value).exists():
            raise serializers.ValidationError("Invalid verification token")
        return value