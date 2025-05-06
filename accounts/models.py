from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import models
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings

ROLES = [
    ('traveller', "Traveller"),
    ('agent', "Agent"),
]

class User(AbstractUser):
    
    role = models.CharField(max_length=9, choices=ROLES)  # True for traveller, False for agent
    is_verified = models.BooleanField(default=False)

    # Add any additional fields you need
    def __str__(self):
        return self.username
    
    def send_verification_email(self):
        
        EmailVerificationToken.objects.filter(user=self).delete()
        token = get_random_string(64)
        EmailVerificationToken.objects.create(user=self, token=token)
        
        verification_url = f"{settings.FRONTEND_URL}/verify-email/{token}/"
        send_mail(
            'Verify your email',
            f'Click this link to verify your email: {verification_url}',
            settings.DEFAULT_FROM_EMAIL,
            [self.email],
            fail_silently=False,
        )

class EmailVerificationToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    @classmethod
    def create_token(cls, user):
        token = get_random_string(64)
        return cls.objects.create(user=user, token=token)