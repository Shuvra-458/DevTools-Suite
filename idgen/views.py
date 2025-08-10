from django.shortcuts import render
import uuid
import random
import string
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def generate_uuid(request):
    return Response({"uuid": str(uuid.uuid4())})

@api_view(['GET'])
def generate_random_string(request):
    length = int(request.GET.get('length', 12))
    characters = string.ascii_letters + string.digits
    result = ''.join(random.choice(characters) for _ in range(length))
    return Response({"random_string": result})
