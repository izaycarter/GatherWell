from django.urls import path

from .views import IndexView

app_name = "frontend"

urlpatterns = [
    path("admin/verify/", IndexView.as_view(), name="admin_verify"),
    path("profile/", IndexView.as_view(), name="church_profile"),
    path("profile/create/", IndexView.as_view(), name="church_profile_form"),
    path("signup/", IndexView.as_view(), name="signup"),
    path("login/", IndexView.as_view(), name="login"),
    path("", IndexView.as_view(), name="index"),
]
