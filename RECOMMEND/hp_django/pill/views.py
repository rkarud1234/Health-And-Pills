from django.shortcuts import render
from rest_framework.response import Response
from .models import Pill
from rest_framework.views import APIView
from .serializer import PillSerializer


class PillListApi(APIView):
    def get(self, request):
        queryset = Pill.objects.all()[:10]
        serializer = PillSerializer(queryset, many=True)
        return Response(serializer.data)