from django.urls import path
from .views import getExamData, getQuestionsData, getAnswerData
# import accounts.views as accView
# import teachers.views as teachView
# import students.views as stdView\
from teachers.views import TeacherList, TeacherDetail, TeacherDashboard, teacher_login, teacher_change_password

app_name = 'API'
urlpatterns = [
    path('exam/', getExamData, name='examAPI'),
    path('question/', getQuestionsData, name='questionAPI'),
    path('answer/', getAnswerData, name='answerAPI'),
    
    path('teacher/', TeacherList.as_view()),
    path('teacher/<int:pk>/', TeacherDetail.as_view()),
    path('teacher/dashboard/<int:pk>/', TeacherDashboard.as_view()),
    path('teacher-login', teacher_login),
    path('teacher/change-password/<int:teacher_id>', teacher_change_password),
]