from django.contrib import admin

# Register your models here.
from .models import MCQExam, Exam, ExamQuestions, AttemptExam

# admin.site.register(MCQExam)
# admin.site.register(CourseCategory)
admin.site.register(Exam)
admin.site.register(ExamQuestions)
admin.site.register(AttemptExam)