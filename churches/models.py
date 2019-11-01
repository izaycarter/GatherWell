from django.db import models
from accounts.models import User

class Church(models.Model):

    WORSHIP_CHOICES = [
        ("LITURGICAL", "Liturgical"),
        ("TRADITIONAL", "Traditional"),
        ("BLENDED", "Blended"),
        ("CONTEMPORARY", "Contemporary"),
        ("MODERN", "Modern"),
    ]

    DENOMINATION_CHOICES = [
        ("NON DENOMINATIONAL", "Non Denominational"),
        ("CATHOLIC", "Catholic"),
        ("ADVENTIST", "Adventist"),
        ("ANABAPTIST", "Anabaptist"),
        ("ANGLICAN", "Anglican"),
        ("BAPTIST", "Baptist"),
        ("CALVINIST", "Calvinist"),
        ("EVANGELICAL", "Evangelical"),
        ("HOLINESS", "Holiness"),
        ("LUTHERAN", "Lutheran"),
        ("METHODIST", "Methodist"),
        ("PENTECOSTAL", "Pentecostal"),
        ("ASSYRIAN", "Assyrian"),
        ("EASTERN ORTHODOX", "Eastern Orthodox"),
        ("ORIENTAL ORTHODOX", "Oriental Orthodox"),
        ("JEHOVAH'S WITNESS", "Jehovah's Witness"),
        ("LATTER DAY SAINT", "Latter Day Saint"),
    ]

    name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    description = models.TextField(max_length=800)
    is_verified = models.BooleanField(default=False)
    denomination = models.CharField(max_length=255, choices=DENOMINATION_CHOICES, null=True)
    website = models.URLField(max_length=255)
    worship_type = models.CharField(max_length=255, choices=WORSHIP_CHOICES)
    image = models.ImageField(upload_to="images/")
    address = models.CharField(max_length=350)
    lat = models.FloatField()
    lng = models.FloatField()
