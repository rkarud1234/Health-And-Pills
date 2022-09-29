from django.urls import path, include
from pill.views import RecommendCustomApi, RecommendBestApi, RecommendItemApi, RecommendUserApi

urlpatterns = [
    path('custom/<int:userId>', RecommendCustomApi.as_view()),
    path('best/', RecommendBestApi.as_view()),
    path('user/<str:gender>/<int:birthday>/', RecommendUserApi.as_view()),
    path('item/<int:userId>/<int:pillId>/', RecommendItemApi.as_view()),
]