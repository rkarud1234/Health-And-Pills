from pyexpat import model
from django.db import models
import pandas as pd

class UserProfile(models.Model):

    class Meta: 
        db_table = 'user_profile'

    user_profile_id = models.AutoField(primary_key=True)
    exercise_times = models.IntegerField()
    user_profile_birthday = models.IntegerField()
    user_profile_fat = models.IntegerField()
    user_profile_gender = models.CharField(max_length=255)
    user_profile_height = models.IntegerField()
    user_profile_nickname = models.CharField(max_length=255)
    user_profile_skeleton = models.IntegerField()
    user_profile_water = models.IntegerField()
    user_profile_weight = models.IntegerField()
    exercise_purpose_id = models.IntegerField()


    def toDataFrame(cols):
        return pd.DataFrame(UserProfile.objects.all().values(), columns=cols)

class UserPill(models.Model):

    class Meta:
        db_table = 'user_pill'

    user_pill_id = models.AutoField(primary_key=True)
    user_pill_bookmark = models.CharField(max_length=10)
    user_pill_taking = models.CharField(max_length=10)
    pill_id = models.IntegerField()
    user_id = models.IntegerField()


class UserExercise(models.Model):
    class Meta:
        db_table = 'user_exercise'

    user_exercise_id = models.AutoField(primary_key=True)
    user_exercise_bookmark = models.CharField(max_length=10)
    user_exercise_doing = models.CharField(max_length=10)
    user_exercise_like = models.CharField(max_length=10)
    exercise_id = models.IntegerField()
    user_id = models.IntegerField()
    

    def toDataFrame(cols):
        return pd.DataFrame(UserExercise.objects.all().values(), columns=cols)