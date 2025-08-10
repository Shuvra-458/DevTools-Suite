from django.urls import path
from .views import home, health_check
urlpatterns = [
    path('', home, name='home'),
    path('ping/', health_check)
]