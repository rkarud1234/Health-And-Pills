from django.urls import path, include
from exercise.views import ExerciseListApi

urlpatterns = [
    path('custom/', ExerciseListApi.as_view()),
    path('best/', ExerciseListApi.as_view()),
    path('user/', ExerciseListApi.as_view()),
    path('item/<int:exerciseId>/', ExerciseListApi.as_view()),
]