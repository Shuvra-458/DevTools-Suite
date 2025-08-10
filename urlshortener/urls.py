from django.urls import path
from .views import create_short_url, get_original_url

urlpatterns = [
    path('create/', create_short_url),
    path('<str:code>/', get_original_url)
]