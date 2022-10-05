from django.shortcuts import render
from exercise.models import Exercise, ExercisePartCategory
from user.models import UserExercise
from user.models import UserProfile
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import ExerciseSerializer
from exercise import recommend



class RecommendCustomApi(APIView):

    def get(self, request, userId):

        pill_list = recommend.recommendCustom(userId)
        
        serializer = ExerciseSerializer(pill_list, many=True)
        data = serializer.data
        return Response(createContext(data, userId))

class RecommendBestApi(APIView):

    def get(self, request, userId):

        pill_list = recommend.recommendBest()
        
        serializer = ExerciseSerializer(pill_list, many=True)
        data = serializer.data
        
        return Response(createContext(data, userId))


class RecommendUserApi(APIView):

    def get(self, request, userId):

        query_object = UserProfile.objects.filter(user_profile_id=userId)[0]
        birthday = query_object.user_profile_birthday
        gender = query_object.user_profile_gender

        pill_list = recommend.recommendUser(birthday, gender)
        
        serializer = ExerciseSerializer(pill_list, many=True)
        data = serializer.data
        return Response(createContext(data, userId))


class RecommendItemApi(APIView):
        
    def get(self, request, userId, exerciseId):
        
        exercise_list = recommend.recommendItem(userId, exerciseId)
        serializer = ExerciseSerializer(exercise_list, many=True)
        data = serializer.data

        return Response(createContext(data, userId))

def getExercisePartName(id):
        return ExercisePartCategory.objects.get(exercise_part_category_id=id)

def createContext(data, userId):
    context = []
    for id in data:
        parts = []
        for part in id['exercisePart']:
            partName = getExercisePartName(part['exercise_part_category_id']).exercise_part_category_name
            parts.append(partName)
        temp = UserExercise.objects.filter(user_id=userId,exercise_id=id['exercise_id']).values_list('user_exercise_bookmark','user_exercise_doing','user_exercise_like')

        if len(temp) > 0:
            temp = list(temp)[0]
        else:
            temp = ['N','N',None]
        context.append(
            {
                'id':id['exercise_id'],
                'name':id['exercise_name'],
                'aerobic':id['exercise_aerobic'],
                'bookmark':temp[0],
                'doing':temp[1],
                'like':temp[2],
                'parts':parts,                    
            }
        )
    return context