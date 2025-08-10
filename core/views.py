from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

def home(request):
    return render(request, 'core/home.html')

@api_view(['GET'])
def health_check(request):
    return Response({"status": "OK", "message": "Dev Tools Suite backend is live."})
# Create your views here.
