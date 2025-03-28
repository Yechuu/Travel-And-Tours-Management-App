from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_traveller = models.BooleanField(default=True)  # True for traveller, False for agent

    
    # Add any additional fields you need

    def __str__(self):
        return self.username
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return{
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }
    @property
    def is_agent(self):
        return not self.is_traveller