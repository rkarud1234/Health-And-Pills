from pyexpat import model
from statistics import mode
from django.db import models

class Pill(models.Model):

    class Meta:
        db_table = 'pill'
    
    pill_id = models.AutoField(primary_key=True)
    pill_name = models.CharField(max_length=255)
    pill_company_name = models.CharField(max_length=255)
    pill_expiration_date = models.CharField(max_length=255)
    pill_take_process = models.TextField()
    pill_take_warning = models.TextField()
    pill_content = models.TextField()
    pill_thumbnail = models.CharField(max_length=100)
    pill_domestic = models.BooleanField()
    review_average = models.FloatField()
    review_count = models.IntegerField()
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()
    
    def __str__(self):
        return self.pill_name