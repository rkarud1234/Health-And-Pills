from django.db import models

class Exercise(models.Model):

    class Meta:
        db_table = 'exercise'

    exercise_id = models.AutoField(primary_key=True)
    exercise_name = models.CharField(max_length=100)
    exercise_content = models.TextField()
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()
    
    def __str__(self):
        return self.pill_name