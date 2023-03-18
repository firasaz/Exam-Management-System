from django.contrib import admin

from Users.admin import UserAdmin, UserAdminConfig
from .models import Teacher, Course, CourseCategory
# Register your models here.

class TeacherAdminConfig(UserAdmin):
    list_display = ('full_name','email','department','qualification','is_staff','is_superuser','is_active')
    list_filter = ('department','email','full_name','is_superuser','is_staff','is_active')
    search_fields = ('email','full_name','department','username')
    ordering = ('-start_date',)

    fieldsets = (
        (None, {
            'fields':('full_name','email','username','department','qualification','profile_img','position')
            }),
        ('Permissions', {
            'fields':('is_staff','is_superuser','is_active')
            }),
        ('Important Dates', {
            'fields':('start_date','last_login')
            }),
        ('Groups', {
            'fields': ('groups','user_permissions')
        })
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields':('full_name','email','department','qualification','password1','password2','profile_img') # for now we cannot add a username to a student while adding a student. add the username when editing an existing user.
            }),
        ('Permissions', {
            'classes': ('wide',),
            'fields':('is_staff','is_superuser','is_active')
            }),
        ('Groups', {
            'classes': ('wide',),
            'fields':('groups','user_permissions')
            })
    )

admin.site.register(Teacher,TeacherAdminConfig)
# admin.site.register(Teacher, UserAdminConfig)
admin.site.register(Course)
admin.site.register(CourseCategory)


# class TeacherInline(admin.StackedInline):
#     model=Teacher
#     can_delete=False
#     verbose_name_plural='teachers'

# class UserAdmin(BaseUserAdmin):
#     inlines=[TeacherInline]

# admin.site.unregister(User)
# admin.site.register(User, UserAdmin)