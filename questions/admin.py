from django.contrib import admin

from .models import Question, Answer, ClassicalAnswer

# this gets the Answer table.....i guess
class AnswerInline(admin.TabularInline):
    model = Answer

# this modifies the Question page by adding the Answer table obtained previously...i guess
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
admin.site.register(ClassicalAnswer)
