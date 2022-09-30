from unittest import result
from django.shortcuts import render
from rest_framework.response import Response
from pill import recommend
from user.models import UserProfile
from .models import Pill
from rest_framework.views import APIView
from .serializer import PillSerializer
import pandas as pd


class RecommendCustomApi(APIView):

    def get(self, request, userId):

        pill_list = recommend.recommendCustom(userId)
        serializer = PillSerializer(pill_list, many=True)

        return Response(serializer.data)

class RecommendBestApi(APIView):

    def get(self, request):

        pill_list = recommend.recommendBest()
        serializer = PillSerializer(pill_list, many=True)

        return Response(serializer.data)
        

class RecommendUserApi(APIView):

    def get(self, request, userId):
        query_object = UserProfile.objects.filter(user_profile_id=userId)[0]
        birthday = query_object.user_profile_birthday
        gender = query_object.user_profile_gender
        
        
        pill_list = recommend.recommendUser(birthday, gender)
        serializer = PillSerializer(pill_list, many=True)

        return Response(serializer.data)

class RecommendItemApi(APIView):

    def get(self, request, userId, pillId):
        
        pill_list = recommend.recommendItem(userId, pillId)
        serializer = PillSerializer(pill_list, many=True)

        return Response(serializer.data)