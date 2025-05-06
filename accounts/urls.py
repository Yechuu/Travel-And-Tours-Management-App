from django.urls import path
from .views import RegisterView, UserListView, UserRetrieveUpdateDestroyView, ProfileRetrieveUpdateDestroyView, VerifyEmailView, ResendVerificationView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView
)

urlpatterns = [
    path('auth/signup/', RegisterView.as_view(), name='signup'),

    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('auth/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    # Admin
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    
    # Account owner
    path('profile/', ProfileRetrieveUpdateDestroyView.as_view(), name='profile-view'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('resend-verification/', ResendVerificationView.as_view(), name='resend-verification'),
    
]