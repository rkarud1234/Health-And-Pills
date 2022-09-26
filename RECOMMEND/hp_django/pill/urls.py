from django.urls import path, include
from pill.views import PillListApi

urlpatterns = [
    path('custom/', PillListApi.as_view()),
    path('best/', PillListApi.as_view()),
    path('user/', PillListApi.as_view()),
    path('item/:pillId', PillListApi.as_view()),
]