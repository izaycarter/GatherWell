from django.urls import path, include
from . import views

urlpatterns =[
    path("admin/verify/<int:pk>/", views.AdminVerifyUpdateDeleteAPIView.as_view(), name="admin-verify"),
    path('churches/', views.ChurchListCreateAPIView.as_view(), name='church_list_create'),
    path('user/churches/', views.UserChurchListAPIView.as_view(), name='user_church_list'),
    path("user/church/events/", views.ChurchEventListCreateAPIView.as_view(), name="user_church_event_create"),
    path("user/church/events/r-u-d/<int:pk>/",views.UserEventRetrieveUpdateDestroyAPIView.as_view(), name="church_event_retrieve_update_destroy"),
    path("churches/subscribers/add/", views.SubscriberCreateAPIView.as_view(), name="add_subscriber"),
    path('churches/<int:pk>/', views.ChurchRetrieveUpdateDestroyAPIView.as_view(), name='church_retrieve_update_destroy'),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/login/', views.CustomAuthToken.as_view(), name='login'),
    path('rest-auth/', include('rest_auth.urls')),
]
