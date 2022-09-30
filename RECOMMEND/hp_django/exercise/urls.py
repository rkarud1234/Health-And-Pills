from django.urls import path, include
from exercise.views import *

urlpatterns = [
    path('custom/<int:userId>/', RecommendCustomApi.as_view()),
    path('best/', RecommendBestApi.as_view()),
    path('user/<int:userId>/', RecommendUserApi.as_view()),
    path('item/<int:userId>/<int:exerciseId>/', RecommendItemApi.as_view()),
]