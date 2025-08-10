from django.shortcuts import render
import base64
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def base64_encode(request):
    text = request.data.get('text')
    if not text:
        return Response({'error': 'text is required'}, status=status.HTTP_400_BAD_REQUEST)
    encoded = base64.b64encode(text.encode()).decode()
    return Response({'encoded': encoded})

@api_view(['POST'])
def base64_decode(request):
    encoded_text = request.data.get('text')
    if not encoded_text:
        return Response({'error': 'text is required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        decoded = base64.b64decode(encoded_text.encode()).decode()
        return Response({'decoded': decoded})
    except Exception as e:
        return Response({'error': 'Invalid base64 string'}, status=status.HTTP_400_BAD_REQUEST)
    
# Create your views here.
