from django.db import models

from students.models import Student
from exams.models import Exam
from django.contrib.auth.models import User
from django.conf import settings

class Result(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    user = models.ForeignKey(Student, on_delete=models.CASCADE)
    score = models.FloatField()

    def __str__(self):
        return f"{self.user} results {self.id}"
