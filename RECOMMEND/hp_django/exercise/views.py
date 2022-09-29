from django.shortcuts import render
from exercise.models import Exercise, ExercisePartCategory
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import ExerciseSerializer
from exercise import recommend



class RecommendCustomApi(APIView):

    def getExercisePartName(self, id):
        return ExercisePartCategory.objects.get(exercise_part_category_id=id)

    def get(self, request, userId):

        pill_list = recommend.recommendCustom(userId)
        
        serializer = ExerciseSerializer(pill_list, many=True)
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

class RecommendBestApi(APIView):

    def getExercisePartName(self, id):
        return ExercisePartCategory.objects.get(exercise_part_category_id=id)

    def get(self, request):

        pill_list = recommend.recommendBest()
        
        serializer = ExerciseSerializer(pill_list, many=True)
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


class RecommendUserApi(APIView):

    def getExercisePartName(self, id):
        return ExercisePartCategory.objects.get(exercise_part_category_id=id)

    def get(self, request, gender, birthday):

        pill_list = recommend.recommendUser(birthday, gender)
        
        serializer = ExerciseSerializer(pill_list, many=True)
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

class RecommendItemApi(APIView):

    def get(self, request, userId, exerciseId):
        
        pill_list = recommend.recommendItem(userId, exerciseId)
        serializer = ExerciseSerializer(pill_list, many=True)

        return Response(serializer.data)

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

