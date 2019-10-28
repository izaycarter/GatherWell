from django.urls import path

from .views import IndexView

app_name = "frontend"

urlpatterns = [
    path("signup/", IndexView.as_view(), name="signup"),
    path("login/", IndexView.as_view(), name="login"),
    path("", IndexView.as_view(), name="index"),
]
