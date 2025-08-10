from django.shortcuts import render
import jwt
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta

@api_view(['POST'])
def encode_jwt(request):
    payload = request.data.get('payload', {})
    secret = request.data.get('secret', settings.SECRET_KEY)
    exp_minutes = request.data.get('exp_minutes', 60)

    try:
        payload['exp'] = datetime.utcnow() + timedelta(minutes=exp_minutes)
        token = jwt.encode(payload, secret, algorithm='HS256')
        return Response({'token': token}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def decode_jwt(request):
    token = request.data.get('token')
    secret = request.data.get('secret', settings.SECRET_KEY)

    try:
        decoded = jwt.decode(token, secret, algorithms=['HS256'])
        return Response({"payload": decoded}, status=status.HTTP_200_OK)
    except jwt.ExpiredSignatureError:
        return Response({'error': 'Token has expired'}, status=status.HTTP_400_BAD_REQUEST)
    except jwt.InvalidTokenError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
