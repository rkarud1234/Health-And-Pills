from django.shortcuts import render
from exercise.models import Exercise, ExercisePartCategory
from user.models import UserProfile
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

    def get(self, request, userId):

        query_object = UserProfile.objects.filter(user_profile_id=userId)[0]
        birthday = query_object.user_profile_birthday
        gender = query_object.user_profile_gender

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
    def getExercisePartName(self, id):
        return ExercisePartCategory.objects.get(exercise_part_category_id=id)
        
    def get(self, request, userId, exerciseId):
        
        exercise_list = recommend.recommendItem(userId, exerciseId)
        serializer = ExerciseSerializer(exercise_list, many=True)
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

