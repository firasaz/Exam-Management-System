from django.contrib import admin

from django.contrib.auth.models import User
from .models import Chairman, Notification

# Register your models here.

admin.site.register(Chairman)
# admin.site.register(Teacher)
# admin.site.register(Course)
# admin.site.register(CourseCategory)
# admin.site.register(Student)
# admin.site.register(StudentAssignment)
# admin.site.register(StudentCourseEnrollment)
admin.site.register(Notification)
