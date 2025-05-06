from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .serializers import (
    RegisterSerializer, 
    UserSerializer, 
    ProfileSerializer,
    EmailVerificationSerializer
)
from .models import User, EmailVerificationToken

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
     
        # user.send_verification_email()
        
        response_data = {
            'user': serializer.data,
            'message': 'Registration successful. Please check your email for verification.'
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class VerifyEmailView(generics.GenericAPIView):
    serializer_class = EmailVerificationSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            token = EmailVerificationToken.objects.get(token=serializer.validated_data['token'])
            if not token.user.is_verified:
                token.user.is_verified = True
                token.user.save()
                token.delete()
                return Response(
                    {'message': 'Email successfully verified'}, 
                    status=status.HTTP_200_OK
                )
            return Response(
                {'message': 'Email already verified'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except EmailVerificationToken.DoesNotExist:
            return Response(
                {'error': 'Invalid token'}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class ProfileRetrieveUpdateDestroyView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = ProfileSerializer(
            request.user, 
            data=request.data, 
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request):
        request.user.delete()
        return Response(
            {'message': 'User account deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )

class ResendVerificationView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            
            if user.is_verified:
                return Response(
                    {'message': 'Email is already verified'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Simply call the user's method - much cleaner!
            user.send_verification_email()
            
            return Response(
                {'message': 'Verification email resent successfully'},
                status=status.HTTP_200_OK
            )
            
        except User.DoesNotExist:
            return Response(
                {'error': 'No account found with this email'},
                status=status.HTTP_404_NOT_FOUND
            )