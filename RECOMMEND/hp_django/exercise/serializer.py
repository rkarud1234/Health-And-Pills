from dataclasses import fields
from rest_framework import serializers
from .models import Exercise, ExercisePart, ExercisePartCategory


class ExercisePartSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExercisePart
        fields = ['exercise_part_category_id']

class ExerciseSerializer(serializers.ModelSerializer):

    exercisePart = ExercisePartSerializer(many=True, read_only=True)

    class Meta:
        model = Exercise
        fields = ['exercise_id','exercise_name','exercisePart']
