from django.urls import path
from .views import getExamData, getQuestionsData, getAnswerData, addExamData
# import accounts.views as accView
# import teachers.views as teachView
# import students.views as stdView
from teachers.views import (
    TeacherList, TeacherDetail, TeacherDashboard, teacher_login, teacher_change_password, TeacherCourseList, TeacherView, TeacherCourseDetail, TeacherExamList, TeacherCourseEdit,
    CategoryList, CourseList, CourseDetailView, CourseExamList, CourseView
    )
from students.views import (
    StudentList, student_login, StudentDetail, StudentDashboard, student_change_password, CourseStudentList, TeacherStudentList
)

from exams.views import ExamDetailView

app_name = 'API'
urlpatterns = [
    path('exam/', getExamData, name='examAPI'),
    path('add-exam/', addExamData, name='addExamAPI'),
    path('exam/<int:pk>/', ExamDetailView.as_view()),
    path('question/', getQuestionsData, name='questionAPI'),
    path('answer/', getAnswerData, name='answerAPI'),
    
    path('teacher/', TeacherList.as_view()),
    path('teacher/<int:pk>/', TeacherDetail.as_view()),
    # path('teacher/<int:id>/orawri/', TeacherView),
    path('teacher/dashboard/<int:pk>/', TeacherDashboard.as_view()),
    path('teacher-login/', teacher_login),
    path('teacher/change-password/<int:teacher_id>/', teacher_change_password),
    path('teacher-courses/<int:teacher_id>/', TeacherCourseList.as_view()),
    path('teacher-course-detail/<int:pk>/', TeacherCourseDetail.as_view()),
    path('teacher-course-edit/<int:c_id>/', TeacherCourseEdit),

    path('teacher-exams/<int:teacher_id>/', TeacherExamList),

    # category
    path('category/', CategoryList.as_view()),

    # course
    path('course/', CourseList.as_view()),
    path('course/<int:pk>/', CourseDetailView.as_view()),
    path('course/<int:id>/orawri/', CourseView),

    # #exam
    # path('exam/', views.ExamList.as_view()),

    # specific course exam
    path('course-exams/<int:course_id>/', CourseExamList.as_view()),
    # students
    path('student/', StudentList.as_view()),
    path('student-login/', student_login),
    path('student/<int:pk>/', StudentDetail.as_view()),
    path('student/dashboard/<int:pk>/', StudentDashboard.as_view()),
    path('student/change-password/<int:student_id>/', student_change_password),
    # path('student-enroll-course/', StudentEnrollCourseList.as_view()),
    # path('fetch-enroll-status/<int:student_id>/<int:course_id>/', fetch_enroll_status),
    path('fetch-enrolled-students/<int:course_id>/', CourseStudentList),
    path('fetch-all-enrolled-students/<int:teacher_id>/', TeacherStudentList),
    # path('fetch-enrolled-courses/<int:student_id>/', EnrolledStudentList.as_view()),
]