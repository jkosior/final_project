from django.shortcuts import render
from rest_framework.views import APIView
from game.models import Being
from django.http.response import Http404

# Create your views here.


class BeingSerializerView(APIView):
    
    def get_object(self, pk):
        try:
            return Being.objects.get(pk=pk)
        except Being.DoesNotExist:
            raise Http404