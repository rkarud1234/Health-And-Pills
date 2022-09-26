from django.shortcuts import render
from exercise.models import Exercise, ExercisePartCategory
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import ExerciseSerializer


class ExerciseListApi(APIView):
    
    def getExercisePartName(self, id):
        return ExercisePartCategory.objects.get(exercise_part_category_id=id)

    def get(self, request):
        queryset = Exercise.objects.all()[:10]
        serializer = ExerciseSerializer(queryset, many=True)
        data = serializer.data
        context = []
        for id in data:
            parts = []
            for part in id['exercisePart']:
                partName = self.getExercisePartName(part['exercise_part_category_id']).exercise_part_category_name
                parts.append(partName)

            context.append(
                {
                    'id':id['exercise_id'],
                    'name':id['exercise_name'],
                    'parts':parts
                }
            )
        return Response(context)

