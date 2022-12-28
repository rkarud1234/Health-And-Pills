from rest_framework import serializers
from .models import Pill

class PillScoreSerializer(serializers.ModelSerializer):
    pass

class PillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pill        # Pill 모델 사용
        fields = ['pill_id','pill_name','pill_company_name','pill_thumbnail'] 