from rest_framework import generics, permissions, viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializers import ChurchSerializer
from .serializers import EventSerializer
from churches.models import Church, Event
from accounts.models import Subscriber
from .permissions import IsOwnerOrReadOnly

# to create a new church or list out all churches in the database
class ChurchListCreateAPIView(generics.ListCreateAPIView):
    queryset = Church.objects.all()
    serializer_class = ChurchSerializer
    permission_classes = (IsOwnerOrReadOnly,)


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# list churches that are associated with the logged in user (owner field on the church model)
class UserChurchListAPIView(generics.ListAPIView):
    queryset = Church.objects.all()
    serializer_class = ChurchSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def get_queryset(self):
        return Church.objects.filter(owner=self.request.user.id)


class ChurchRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Church.objects.all()
    serializer_class = ChurchSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class ChurchEventListCreateAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })
