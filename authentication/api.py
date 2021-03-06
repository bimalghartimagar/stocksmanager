from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken

from .serializer import UserSerializer, SignupSerialzer, LoginSerializer


# Signup API
class SignupAPI(generics.GenericAPIView):
    serializer_class = SignupSerialzer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })
# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    print('we are here')

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        print(self.request.user)
        return self.request.user