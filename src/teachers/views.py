from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from API.serializer import (
    TeacherSerializer,TeacherDashboardSerializer, TeacherEditSerializer, TeacherCourseSerializer,
    CourseSerializer, CourseEditSerializer, CourseDetailSerializer, CategorySerializer,
    ExamSerializer, AddExamSerializer,
    StudentSerializer
    )

from .models import Teacher, Course, CourseCategory
from exams.models import Exam

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
    serializer_class = TeacherEditSerializer
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

    # try:
    #     teacherData = Teacher.objects.get(
    #         email=email, password=password)
    # except Teacher.DoesNotExist:
    #     teacherData = None
    
    teacherData = authenticate(request, email=email, password=password)
    
    # teacherData = authenticate(request, username=email, password=password)
    # print(teacherData.is_staff)
    if teacherData:
        login(request, teacherData)
        return JsonResponse({'bool': True, 'id': teacherData.id, 'position': teacherData.is_staff, 'name': teacherData.full_name})
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
    serializer_class = TeacherCourseSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = Teacher.objects.get(pk=teacher_id)
        return Course.objects.filter(teacher=teacher)

# 7
# specific teacher course detail
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer

@csrf_exempt
@api_view(['GET','PUT'])
def TeacherCourseEdit(request,c_id):
    course = Course.objects.get(id=c_id)
    if request.method == "GET":
        serializer = CourseEditSerializer(course)
        return Response(serializer.data)
    
    elif request.method == "PUT":
        serializer = CourseEditSerializer(course, data=request.data)
        # print(serializer)
        if serializer.is_valid():
            serializer.save()
            # print(serializer.validated_data['category'])
            print(serializer.validated_data)
            # # category=CourseCategory.objects.get(id=serializer.validated_data['category'])
            # category=serializer.validated_data['category']
            # # teacher=Teacher.objects.get(id=serializer.validated_data['teacher'])
            # teacher=serializer.validated_data['teacher']
            # title=serializer.validated_data['title']
            # description=serializer.validated_data['description']
            # prerequisites=serializer.validated_data['prerequisites']
            # featured_img=serializer.validated_data['featured_img']

            # course.category=category
            # course.teacher=teacher
            # course.title=title
            # course.description=description
            # course.prerequisites=prerequisites
            # course.featured_img=featured_img
            # serializer.save(update_fields=['category','teacher','title','description','prerequisites','featrued_img'])
            # print(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(request.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# @api_view(["GET", "POST"])
# @csrf_exempt
# def TeacherCourseEdit(request,pk):
#     if request.method == "GET":
#         course = Course.objects.get(id=pk)
#         serializer = CourseEditSerializer(course)
#         return Response(serializer.data)

#     elif request.method == "POST":
#         serializer = CourseEditSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)

# 8
# class TeacherExamList(generics.ListCreateAPIView):
#     serializer_class = AddExamSerializer

#     def get_queryset(self):
#         teacher_id = self.kwargs['teacher_id']
#         teacher = Teacher.objects.get(pk=teacher_id)
#         return teacher.teacher_exams().values()

@api_view(["GET"])
def TeacherExamList(request,teacher_id):
    teacher = Teacher.objects.get(id=teacher_id)
    exams=teacher.teacher_exams()
    serializer=ExamSerializer(exams, many=True)
    # print(serializer.data)
    return Response(serializer.data)

@api_view(["GET"])
def teacher_students_view(request, teacher_id):
    try:
        teacher = Teacher.objects.get(id=teacher_id)
    except Teacher.DoesNotExist:
        teacher = None
    if teacher:
        teacher_students = teacher.teacher_students()
        serializer = StudentSerializer(teacher_students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return JsonResponse({
        "bool": "False",
        "teacher": "No such teacher found."
    })

@api_view(['GET','POST'])
def assign_exam(request, exam_id):
    try:
        exam = Exam.objects.get(id=exam_id)
    except Exam.DoesNotExist:
        exam = None
    if exam:
        exam_course = exam.course
        exam_teacher = exam.get_teacher()
        teacher_students = exam_teacher.teacher_students()
        
        for student in teacher_students: # loop over each student taking a course with this exam's teacher
            # print(student)
            # print(exam_course)
            # print(student.enrolled_courses())
            if exam_course in student.enrolled_courses(): # check for each student whether they take this exam's course
                print(student)
                exam.student.add(student) # add student of that course to the exam
    serializer=ExamSerializer(exam)
    return Response(serializer.data)

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
    serializer_class = CourseDetailSerializer


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
        try:
            course = Course.objects.get(pk=course_id)
            return Exam.objects.filter(course=course)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
# 5)
# Delete Course View
@api_view(['GET','DELETE'])
def delete_course(request,c_id):
    try:
        course = Course.objects.get(id=c_id)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = CourseEditSerializer(course)
        return Response(serializer.data)
    elif request.method == "DELETE":
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    