from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login, logout

from rest_framework import generics
from API.serializer import (
    TeacherSerializer,TeacherDashboardSerializer, 
    CourseSerializer, CategorySerializer,
    ExamSerializer
    )

from .models import Teacher, Course, CourseCategory
from exams.models import MCQ_Exam

# Create your views here.

# Teachers' Views
# 1
class TeacherList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

# 2
class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

# 3
class TeacherDashboard(generics.RetrieveAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer

def TeacherView(request,id):
    teachers = Teacher.objects.get(id=id)
    courses=Course.objects.all()
    print(type(teachers.total_teacher_exams()))
    # for exam in teachers.total_teacher_exams():
    #     print(exam.description)
    print("Teacher: ",teachers)
    print("total_teacher_exams: ",teachers.total_teacher_exams()) # Course.objects.get(id=2)
    print("total_teacher_courses: ",teachers.total_teacher_courses()) # Course.objects.filter(teacher=self).count()
    print()
    for course in courses:
        print(course.course_exams())
        print(course)
    print()
    print(courses.get(examss=1).teacher.id)
    return HttpResponse("test")

# 4
@csrf_exempt
def teacher_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    # print(email)
    # print(password)

    try:
        teacherData = Teacher.objects.get(
            email=email, password=password)
    except Teacher.DoesNotExist:
        teacherData = None
    
    # teacherData = authenticate(request, username=email, password=password)
    # print(teacherData)
    if teacherData:
        return JsonResponse({'bool': True, 'teacher_id': teacherData.id})
    else:
        return JsonResponse({'bool': False})

# 5
@csrf_exempt
def teacher_change_password(request, teacher_id):
    password = request.POST.get('password')

    try:
        teacherData = Teacher.objects.get(id=teacher_id)
    except Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

# 6
# specific teacher course
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = Teacher.objects.get(pk=teacher_id)
        return Course.objects.filter(teacher=teacher)

# 7
# specific teacher course detail
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# Courses Views
# 1
class CategoryList(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CategorySerializer

# 2
class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        # print(qs)
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = Course.objects.all().order_by('-id')[:limit]
        return qs

# 3)
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


def CourseView(request,id):
    course = Course.objects.get(id=id)
    counter=0
    exams_lst=[]
    for i in course.course_exams():
        counter+=1
        exams_lst.append(i)
        print(i)
    print(exams_lst)
    return HttpResponse("orawri\n")
    


# 4)
# Course exam list
class CourseExamList(generics.ListCreateAPIView):
    serializer_class = ExamSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(pk=course_id)
        return MCQ_Exam.objects.filter(course=course)