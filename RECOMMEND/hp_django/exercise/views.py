from django.shortcuts import render
from rest_framework.response import Response
from .models import Exercise
from rest_framework.views import APIView
from .serializer import ExerciseSerializer


class ExerciseListApi(APIView):
    def get(self, request):
        queryset = Exercise.objects.all()
        print(queryset)
        serializer = ExerciseSerializer(queryset, many=True)
        return Response(serializer.data)