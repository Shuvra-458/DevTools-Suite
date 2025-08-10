from django.shortcuts import render
import random, string
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import ShortURL
from .serializers import ShortURLSerializer

def generate_short_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

@api_view(['POST'])
def create_short_url(request):
    original_url = request.data.get('original_url')
    if not original_url:
        return Response({'error': 'original_url is required'}, status = status.HTTP_400_BAD_REQUEST)
    short_code = generate_short_code()
    short_url = ShortURL.objects.create(original_url = original_url, short_code=short_code)
    serializer = ShortURLSerializer(short_url)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_original_url(request, code):
    try:
        short_url = ShortURL.objects.get(short_code=code)
        return Response({'original_url': short_url.original_url})
    except ShortURL.DoesNotExist:
        return Response({'error': 'Invalid short code'}, status = status.HTTP_404_NOT_FOUND)
    

# Create your views here.
