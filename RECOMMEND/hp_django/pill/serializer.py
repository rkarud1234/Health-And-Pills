from rest_framework import serializers
from .models import Pill

class PillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pill        # Pill 모델 사용
        fields = '__all__'  # 모든 필드 포함