from django.contrib import admin

from Users.admin import UserAdmin
from .models import Question, Answer, ClassicalAnswer, ExamQuestionAnswers

# this gets the Answer table.....i guess
class AnswerInline(admin.TabularInline):
    model = Answer

# this modifies the Question page by adding the Answer table obtained previously...i guess
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]
    list_display = ('question','exam')
    list_filter = ('exam',)

admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
admin.site.register(ClassicalAnswer)

class ExamQuestionAnswersAdmin(admin.ModelAdmin):
    list_display = ('student','exam','question','id')
    list_filter = ('student','exam','add_time')
    search_fields = ('exam',)
    readonly_fields = ('add_time',)
    # ordering = ('add_time',)

    fieldsets = (
        (None, {'fields': ('exam','student','question','ans_status')}),
    )

admin.site.register(ExamQuestionAnswers,ExamQuestionAnswersAdmin)
