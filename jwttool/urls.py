from django.urls import path
from .views import encode_jwt, decode_jwt

urlpatterns = [
    path('encode/', encode_jwt, name='encode_jwt'),
    path('decode/', decode_jwt, name='decode_jwt'),
]
