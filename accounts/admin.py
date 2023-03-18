from django.contrib import admin

from django.contrib.auth.models import User
from Users.admin import UserAdminConfig
from .models import Chairman #, Notification

# Register your models here.

class ChairmanAdminConfig(UserAdminConfig):
    list_display = ("full_name","email","department","qualification","is_active")
    list_filter = ("department","qualification","is_active")
    search_fields = ("full_name","email","department")
    ordering = ("-start_date",)

    fieldsets = (
        (None, {
            "fields": ("full_name","username","email","department","qualification","profile_img")
            }),
        ("Permissions", {
            "fields": ("is_active","is_staff","is_superuser")
            }),
        ("Important Dates", {
            "fields": ("start_date", "last_login")
            })
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("full_name","username","email","password","department","qualification","profile_img")
            }),
        ("Permissions", {
            "classes": ("wide",),
            "fields": ("is_active","is_staff","is_superuser")
            }),
        ("Groups", {
            "classes": ("wide",),
            "fields": ("groups","user_permissions")
        })
    )


admin.site.register(Chairman, ChairmanAdminConfig)
# admin.site.register(Teacher)
# admin.site.register(Course)
# admin.site.register(CourseCategory)
# admin.site.register(Student)
# admin.site.register(StudentAssignment)
# admin.site.register(StudentCourseEnrollment)
# admin.site.register(Notification)
