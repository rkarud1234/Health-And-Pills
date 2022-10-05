from unittest import result
from django.shortcuts import render
from rest_framework.response import Response
from pill import recommend
from user.models import UserProfile
from .models import Pill, PillReview
from rest_framework.views import APIView
from .serializer import PillSerializer
import pandas as pd


class RecommendCustomApi(APIView):

    def get(self, request, userId):

        pill_list = recommend.recommendCustom(userId)
        serializer = PillSerializer(pill_list, many=True)
        data = serializer.data

        return Response(createContext(data))

class RecommendBestApi(APIView):

    def get(self, request, userId):

        pill_list = recommend.recommendBest(userId)
        serializer = PillSerializer(pill_list, many=True)
        data = serializer.data

        return Response(createContext(data))
        

class RecommendUserApi(APIView):

    def get(self, request, userId):
        query_object = UserProfile.objects.filter(user_profile_id=userId)[0]
        birthday = query_object.user_profile_birthday
        gender = query_object.user_profile_gender       
        
        pill_list = recommend.recommendUser(birthday, gender)
        serializer = PillSerializer(pill_list, many=True)

        data = serializer.data

        return Response(createContext(data))

class RecommendItemApi(APIView):

    def get(self, request, userId, pillId):
        
        pill_list = recommend.recommendItem(userId, pillId)
        serializer = PillSerializer(pill_list, many=True)
        data = serializer.data
        return Response(createContext(data))



def getReviewInfo(id):
    reviews = PillReview.objects.filter(pill_id=id)
    sum = 0
    for review in reviews:
        sum += review.pill_review_score  

    count = len(reviews)
    if count != 0:
        average = round(sum/count,2)
    else:
        return 0,0
    return count, average

def createContext(data):
    context = []
    for id in data:
            count, average = getReviewInfo(id['pill_id'])                
            context.append({
                    "pillId":id['pill_id'],
                    "pillName":id['pill_name'],
                    "pillCompanyName":id['pill_company_name'],
                    "pillThumbnail":id['pill_thumbnail'],
                    "pillReviewCount": average,
                    "pillReviewAverage": count                    
                }           
            )

    return context