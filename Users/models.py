from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

class Teacher(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100,null=True)
    