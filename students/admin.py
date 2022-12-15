from django.contrib import admin

from .models import Student # StudentCourseEnrollment, StudentAssignment
# Register your models here.

admin.site.register(Student)
# admin.site.register(StudentCourseEnrollment)
# admin.site.register(StudentAssignment)
