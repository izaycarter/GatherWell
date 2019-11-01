from rest_framework import serializers

# from accounts.models import Profile
from churches.models import Church

# class ProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Profile
#         fields = '__all__'
        # fields = ("id", "name", "owner", "description", "is_verified", "denomination", "website", "worship_type", "image")


class ChurchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Church
        fields = ("id", "name", "owner","address", "description", "is_verified", "denomination", "website", "worship_type", "image","lat","lng")
