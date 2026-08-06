from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, permissions
from .token import CustomTokenObtainPairSerializer
from .serializers import RegisterSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]