from django.db import models
from django.urls import reverse
from teachers.models import Course

# Create your models here.

class MCQExam(models.Model):
    question = models.CharField(max_length=100)
    option1 = models.CharField(max_length=100,null=True)
    option2 = models.CharField(max_length=100,null=True)
    option3 = models.CharField(max_length=100,null=True)
    option4 = models.CharField(max_length=100,null=True)
    answer = models.CharField(max_length=100)

    def __str__(self):
        return "Question "+str(self.id)

    class Meta:
        verbose_name_plural="MCQ Exams"

class MCQ_Exam(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True,related_name="examss")
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    number_of_questions = models.IntegerField()
    time = models.IntegerField(help_text="duration of the exam(in mins.)")

    class Meta:
        verbose_name_plural="MCQ_Exams"

    def __str__(self):
        return f"Exam: {self.name}"
        # return "Exam "+str(self.id)
    
    def get_questions(self):
        return self.questions.all()[:self.number_of_questions]
    
    def get_absolute_url(self):
        return reverse("exams:exam-detail", kwargs={"id": self.id}) # need to specify the app name that we added in urls.py file

# class CourseCategory(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, default="")
#     title = models.CharField(max_length=100)
#     description = models.CharField(max_length=500)

#     class Meta:
#         verbose_name_plural="Course Categories"
