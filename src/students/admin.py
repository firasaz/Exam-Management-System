from django.contrib import admin

from Users.admin import UserAdmin
from .models import Student
# Register your models here.

class StudentAdminConfig(UserAdmin):
    list_display = ("full_name","email","username","is_active")
    list_filter = ("full_name","email","username", "is_active")
    search_fields = ("full_name","email","username")
    ordering = ("-start_date",)

    fieldsets = (
        (None, {
            "fields": ("full_name","email","username",'profile_img')
            }),
        ("Permissions", {
            "fields": ("is_active",)
            }),
        ('Important Dates', {
            'fields':('start_date','last_login')
            })
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("full_name", "email", "password1", "password2",'profile_img') # for now we cannot add a username to a student while adding a student. add the username when editing an existing user.
            }),
        ("Permissions", {
            "classes": ("wide",),
            "fields": ("is_active",)
            }),
        ("Groups", {
            "classes": ("wide",),
            "fields": ("groups",)
            })
    )

admin.site.register(Student, StudentAdminConfig)



# from .models import StudentCourseEnrollment, StudentAssignment
# admin.site.register(StudentCourseEnrollment)
# admin.site.register(StudentAssignment)
