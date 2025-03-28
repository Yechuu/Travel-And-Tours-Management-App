from django.urls import path
# from .views import SignUpView, LoginView, LogoutView
from .views import RegisterView, LoginAPIView, LogoutAPIView

urlpatterns = [
    # path('signup/', SignUpView.as_view(), name='signup'),
    path('signup/', RegisterView.as_view(), name='signup'),

    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
]