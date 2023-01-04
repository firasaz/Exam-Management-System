from django.db import models

from exams.models import MCQ_Exam
from django.contrib.auth.models import User
from django.conf import settings

class Result(models.Model):
    exam = models.ForeignKey(MCQ_Exam, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.FloatField()

    def __str__(self):
        return f"{self.user} results {self.id}"
