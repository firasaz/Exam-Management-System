from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

class ClassicalExam(models.Model):
    question = models.CharField(max_length=50)
    answer = models.TextField(null = True,max_length=50)