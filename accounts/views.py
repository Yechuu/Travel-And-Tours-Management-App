# from django.shortcuts import render

# # Create your views here.
# from rest_framework import generics, permissions, status
# from rest_framework.response import Response
# from rest_framework_simplejwt.views import TokenObtainPairView
# from .serializers import UserSerializer, CustomTokenObtainPairSerializer
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class SignUpView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.AllowAny]

# class LoginView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer

# class LogoutView(generics.GenericAPIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         # In a real-world scenario, you might want to blacklist the token here
#         return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)

from rest_framework import generics,status,views,permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer,LoginSerializer,LogoutSerializer

# Create your views here.

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to register
    def post(self,request):
        user=request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        return Response(user_data, status=status.HTTP_201_CREATED)

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to register
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)