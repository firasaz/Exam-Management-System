from django.contrib import admin

# Register your models here.
from .models import Exam, AttemptExam
# from .models import ExamQuestions

class ExamAdminConfig(admin.ModelAdmin):
    list_display = ('name','number_of_questions','duration','course','teacher')
    list_filter = ('name','duration','teacher')
    search_fields = ('name','teacher','course','duration')
    # ordering = ('-start_date',)

    fieldsets = (
        (None, {
            'fields':('name','description','number_of_questions','duration')
            }),
        ('Details', {
            'fields':('course','teacher','student')
            }),
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

admin.site.register(Exam, ExamAdminConfig) # , ExamAdminConfig
# admin.site.register(ExamQuestions)
admin.site.register(AttemptExam)