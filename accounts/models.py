from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import models


ROLES = [
    ('traveller', "Traveller"),
    ('agent', "Agent"),
]

class User(AbstractUser):
    
    role = models.CharField(max_length=9, choices=ROLES)  # True for traveller, False for agent

    # Add any additional fields you need
    def __str__(self):
        return self.username
    