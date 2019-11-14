from rest_framework import generics, permissions, viewsets, views
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializers import ChurchSerializer
from .serializers import EventSerializer
from .serializers import SubscriberSerializer
from churches.models import Church, Event, Subscriber
from .permissions import IsOwnerOrReadOnly, IsAdminUser, IsEventOwner
from rest_framework.permissions import AllowAny
from twilio.rest import Client
from conf.settings import ACCOUNT_SID,AUTH_TOKEN


class AdminVerifyUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Church.objects.all()
    permission_classes = (IsAdminUser,)
    serializer_class = ChurchSerializer


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


class UserEventRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsEventOwner,)



class ChurchEventListCreateAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, request ):
        client = Client(ACCOUNT_SID,AUTH_TOKEN)
        church = Church.objects.get(pk=request.data['church'])
        event , created = Event.objects.get_or_create(
            title = request.data['title'],
            description = request.data['description'],
            address = request.data['address'],
            date = request.data['date'],
            church = church,
        )
        subscribers = church.subscribers.all()
        # import pdb; pdb.set_trace()
        # event_date = event.date.strftime('%m/%d/%Y')

        #  METHOD TO RUN IF I HAD PAID TWILIO ACCOUNT TO SEND TO ALL SUBSCRIBERS
        # for subscriber in church.subscribers.all():
        #     message = client.messages \
        #             .create(
        #                  body= church.name +" Posted a new event titled :" + event.title + ". description of the event is: " + event.description + " and will be hosted at " + event.address + " on " + event_date ,
        #                  from_='+12015844489',
        #                  to= subscriber.phone_number
        #              )

        message = client.messages \
                    .create(
                         body= church.name +" Posted a new event titled :" + event.title + ". description of the event is: " + event.description + " and will be hosted at " + event.address + " on " + event.date ,
                         from_='+12015844489',
                         to= '+18649156152'
                     )









# this is the view to add subscribers to a church
class SubscriberCreateAPIView(views.APIView):
    permission_classes = (AllowAny,)
    def post(self, request):

        # you need to either get or create the subscriber
        subscriber, created = Subscriber.objects.get_or_create(phone_number = "+1"+request.data['phone_number'],)
        # import pdb; pdb.set_trace()
        # you need to get the church they want to subscribe to
        church = Church.objects.get(pk=request.data['selected_church_id'])
        # import pdb; pdb.set_trace()
        # you need to add the subscriber to the church subscribers list
        church.subscribers.add(subscriber)

        return Response()

        # then you need to save the church

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
