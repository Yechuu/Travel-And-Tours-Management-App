from rest_framework import generics,status,views,permissions, decorators, response, exceptions
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer, ProfileSerializer
from .models import User

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
        return response.Response(serializer.data)

    def put(self, request):

        serializer = ProfileSerializer(request.user, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        return response.Response(serializer.data)
    

    def delete(self, request):

        User.objects.delete(id=request.user.id)
        return response.Response({})