from django.urls import path

from .views import ExamsListView,examView,takeExamView, submitExamView

app_name='exams'
urlpatterns = [
    path("",ExamsListView.as_view(), name='exam-list'),
    path("<id>/",examView, name='exam-detail'), # the url can be specified as <"int:id/>" as well
    path("<int:id>/take/",takeExamView, name='take-exam'),
    path("<int:id>/submit/",submitExamView, name='submit-exam')
]
