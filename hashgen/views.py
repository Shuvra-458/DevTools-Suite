from django.shortcuts import render
import hashlib
import zlib
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Extra algorithms not in hashlib
extra_algorithms = {
    'crc32': lambda s: format(zlib.crc32(s.encode('utf-8')) & 0xffffffff, '08x')
}

@api_view(['POST'])
def generate_hash(request):
    text = request.data.get('text', '')
    algorithm = request.data.get('algorithm', 'sha256').lower()

    if algorithm in extra_algorithms:
        result = extra_algorithms[algorithm](text)
        return Response({
            "algorithm": algorithm,
            "hash": result
        })

    if algorithm not in hashlib.algorithms_available:
        return Response({
            "error": f"Unsupported algorithm '{algorithm}'",
            "supported": sorted(list(hashlib.algorithms_available) + list(extra_algorithms.keys()))
        }, status=400)

    hash_func = hashlib.new(algorithm)
    hash_func.update(text.encode('utf-8'))
    result = hash_func.hexdigest()
    return Response({
        "algorithm": algorithm,
        "hash": result
    })

@api_view(['GET'])
def list_hash_algorithms(request):
    supported = sorted(list(hashlib.algorithms_available) + list(extra_algorithms.keys()))
    return Response({"supported_algorithms": supported})

# Create your views here.
