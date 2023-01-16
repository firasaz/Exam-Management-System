# from django.urls import path
# from .views import getExamData, getQuestionsData, getAnswerData, addExamData
# # import accounts.views as accView
# # import teachers.views as teachView
# # import students.views as stdView
# from teachers.views import (
#     TeacherList, TeacherDetail, TeacherDashboard, teacher_login, teacher_change_password, TeacherCourseList, TeacherView, TeacherCourseDetail, TeacherExamList, TeacherCourseEdit,
#     CategoryList, CourseList, CourseDetailView, CourseExamList, CourseView
#     )
# from students.views import (
#     StudentList, student_login, StudentDetail, StudentDashboard, student_change_password, CourseStudentList, TeacherStudentList
# )

# from exams.views import ExamDetailView

# app_name = 'API'
# urlpatterns = [
#     path('exam/', getExamData, name='examAPI'),
#     path('add-exam/', addExamData, name='addExamAPI'),
#     path('exam/<int:pk>/', ExamDetailView.as_view()),
#     path('question/', getQuestionsData, name='questionAPI'),
#     path('answer/', getAnswerData, name='answerAPI'),
    
#     path('teacher/', TeacherList.as_view()),
#     path('teacher/<int:pk>/', TeacherDetail.as_view()),
#     # path('teacher/<int:id>/orawri/', TeacherView),
#     path('teacher/dashboard/<int:pk>/', TeacherDashboard.as_view()),
#     path('teacher-login/', teacher_login),
#     path('teacher/change-password/<int:teacher_id>/', teacher_change_password),
#     path('teacher-courses/<int:teacher_id>/', TeacherCourseList.as_view()),
#     path('teacher-course-detail/<int:pk>/', TeacherCourseDetail.as_view()),
#     path('teacher-course-edit/<int:c_id>/', TeacherCourseEdit),

#     path('teacher-exams/<int:teacher_id>/', TeacherExamList),

#     # category
#     path('category/', CategoryList.as_view()),

#     # course
#     path('course/', CourseList.as_view()),
#     path('course/<int:pk>/', CourseDetailView.as_view()),
#     path('course/<int:id>/orawri/', CourseView),

#     # #exam
#     # path('exam/', views.ExamList.as_view()),

#     # specific course exam
#     path('course-exams/<int:course_id>/', CourseExamList.as_view()),
#     # students
#     path('student/', StudentList.as_view()),
#     path('student-login/', student_login),
#     path('student/<int:pk>/', StudentDetail.as_view()),
#     path('student/dashboard/<int:pk>/', StudentDashboard.as_view()),
#     path('student/change-password/<int:student_id>/', student_change_password),
#     # path('student-enroll-course/', StudentEnrollCourseList.as_view()),
#     # path('fetch-enroll-status/<int:student_id>/<int:course_id>/', fetch_enroll_status),
#     path('fetch-enrolled-students/<int:course_id>/', CourseStudentList),
#     path('fetch-all-enrolled-students/<int:teacher_id>/', TeacherStudentList),
#     # path('fetch-enrolled-courses/<int:student_id>/', EnrolledStudentList.as_view()),
# ]
from django.urls import path
from .views import getExamData, getQuestionsData, getAnswerData, addExamData
from teachers.views import (
    TeacherList, TeacherDetail, TeacherDashboard, teacher_login, teacher_change_password, TeacherCourseList, TeacherView, TeacherCourseDetail, TeacherExamList, TeacherCourseEdit,
    CategoryList, CourseList, CourseDetailView, CourseExamList, CourseView
    )
from students.views import (
    StudentList, student_login, StudentDetail, StudentDashboard, student_change_password, CourseStudentList, TeacherStudentList
)

from exams.views import ExamDetailView, ExamsListView, fetch_exam_assign_status, exam_edit

app_name = 'API'

urlpatterns = [
    # # chairman
    # path('chairman/', ChairmanList.as_view()),
    # path('chairman/<int:pk>/', ChairmanDetail.as_view()),
    # path('chairman/dashboard/<int:pk>/', ChairmanDashboard.as_view()),
    # path('chair-login', chairman_login),
    # path('chairman/change-password/<int:chairman_id>',chairman_change_password),

    # Teacher
    path('', CourseList.as_view()),
    path('teacher/', TeacherList.as_view()),
    path('teacher/dashboard/<int:pk>/', TeacherDashboard.as_view()),
    path('teacher/<int:pk>/', TeacherDetail.as_view()),
    path('teacher/change-password/<int:teacher_id>/', teacher_change_password),
    path('teacher-login/', teacher_login),

    # Category
    path('category/', CategoryList.as_view()),
    # Course
    path('course/', CourseList.as_view()),
    path('search-courses/<str:searchstring>', CourseList.as_view()),
    # Course Detail
    path('course/<int:pk>/', CourseDetailView.as_view()),

    # Teacher Courses
    path('teacher-courses/<int:teacher_id>',TeacherCourseList.as_view()),
    # Course Detail
    path('teacher-course-detail/<int:pk>', TeacherCourseDetail.as_view()),



    # Student
    path('student/', StudentList.as_view()),
    # path('teacher-forgot-password/', teacher_forgot_password),
    path('teacher-change-password/<int:teacher_id>/', teacher_change_password),
    # path('user-forgot-password/', user_forgot_password),
    # path('user-change-password/<int:student_id>/', user_change_password),
    path('student/<int:pk>/', StudentDetail.as_view()),
    path('student/dashboard/<int:pk>/', StudentDashboard.as_view()),
    path('student/change-password/<int:student_id>/',student_change_password),
    path('user-login/', student_login),
    # path('student-enroll-course/', StudentEnrollCourseList.as_view()),
    # path('fetch-enroll-status/<int:student_id>/<int:course_id>', fetch_enroll_status),
    # path('fetch-all-enrolled-students/<int:teacher_id>',EnrolledStudentList.as_view()),
    # path('fetch-enrolled-students/<int:course_id>',EnrolledStudentList.as_view()),
    # path('fetch-enrolled-courses/<int:student_id>',EnrolledStudentList.as_view()),

    # path('student-assignment/<int:teacher_id>/<int:student_id>',AssignmentList.as_view()),
    # path('my-assignments/<int:student_id>', MyAssignmentList.as_view()),
    # path('update-assignment/<int:pk>', UpdateAssignment.as_view()),
    # path('student/fetch-all-notifications/<int:student_id>/', NotificationList.as_view()),
    # path('save-notification/', NotificationList.as_view()),

    # Quiz Start
    # path('exam/', QuizList.as_view()),
    # path('teacher-exam/<int:teacher_id>', TeacherExamList.as_view()),
    path('exam/', ExamsListView.as_view()),
    path('teacher-exam/<int:teacher_id>/', TeacherExamList),
    path('teacher-exams/<int:teacher_id>/', TeacherExamList),
    path('add-exam/', addExamData, name='addExamAPI'), # path by firas
    # path('teacher-exam-detail/<int:pk>/', TeacherExamDetail.as_view()),
    path('teacher-exam-detail/<int:pk>/', ExamDetailView.as_view()), # 'pk' is the exam pk, path by firas
    path('teacher-exam-detail-edit/<int:pk>/', exam_edit), # 'pk' is the exam pk, path by firas
    # path('quiz/<int:pk>', QuizDetailView.as_view()),
    # path('quiz-questions/<int:quiz_id>', QuizQuestionList.as_view()),
    # path('quiz-questions/<int:quiz_id>/<int:limit>',QuizQuestionList.as_view()),
    path('fetch-quiz-assign-status/<int:quiz_id>/<int:course_id>/',fetch_exam_assign_status),
    # path('quiz-assign-course/', CourseQuizList.as_view()),
    # path('fetch-assigned-quiz/<int:course_id>/', CourseQuizList.as_view()),
    # path('attempt-quiz/', AttemptQuizList.as_view()),
    # path('quiz-questions/<int:quiz_id>/next-question/<int:question_id>/',QuizQuestionList.as_view()),
    # path('fetch-quiz-attempt-status/<int:quiz_id>/<int:student_id>/',fetch_quiz_attempt_status),


    # path('attempted-quiz/<int:quiz_id>/', AttemptQuizList.as_view()),
    # path('fetch-quiz-result/<int:quiz_id>/<int:student_id>/',fetch_quiz_result),



    # path('send-message/<int:teacher_id>/<int:student_id>/',save_teacher_student_msg),
    # path('get-messages/<int:teacher_id>/<int:student_id>/',MessageList().as_view()),

    # path('send-group-message/<int:teacher_id>/',save_teacher_student_group_msg),
    # path('send-group-message-from-student/<int:student_id>', save_teacher_student_group_msg_from_student),

    # path('fetch-my-teachers/<int:student_id>/', MyTeacherList.as_view()),
]