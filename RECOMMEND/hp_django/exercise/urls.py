from django.urls import path, include
from exercise.views import ExerciseListApi, Item

urlpatterns = [
    path('custom/', ExerciseListApi.as_view()),
    path('best/', ExerciseListApi.as_view()),
    path('user/', ExerciseListApi.as_view()),
    path('item/<int:exerciseId>/', Item.as_view()),
]