from django.contrib import admin

# Register your models here.
from .models import MCQExam, Exam

# admin.site.register(MCQExam)
# admin.site.register(CourseCategory)
admin.site.register(Exam)