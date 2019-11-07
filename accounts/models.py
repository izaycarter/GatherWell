from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass


class Subscriber(models.Model):
    phone_number = models.CharField(max_length=12)
