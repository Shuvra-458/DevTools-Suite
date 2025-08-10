from django.urls import path
from .views import generate_hash

urlpatterns = [
    path('generate-hash/', generate_hash, name='generate_hash'),
    path('listhash/', generate_hash, name='list_hash_algorithms'),
]
