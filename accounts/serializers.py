from rest_framework import serializers
from .models import User
import re

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
        return User.objects.create_user(**validated_data)