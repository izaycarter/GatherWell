from rest_framework import serializers

from churches.models import Church, Event, Subscriber

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("id","title","description","address","date", "church")



class ChurchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Church
        fields = ("id", "name", "owner","address", "description", "is_verified", "denomination", "website", "worship_type", "image","lat","lng","subscribers")


class SubscriberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscriber
        fields = ('id', 'phone_number', )
