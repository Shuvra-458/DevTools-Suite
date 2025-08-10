from django.urls import path
from .views import base64_encode, base64_decode

urlpatterns = [
    path('encode/', base64_encode),
    path('decode/', base64_decode),
]