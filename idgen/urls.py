from django.urls import path
from .views import generate_uuid, generate_random_string
urlpatterns = [
    path('uuid/', generate_uuid, name='generate_uuid'),
    path('random-string/', generate_random_string, name='generate_random_string'),
]