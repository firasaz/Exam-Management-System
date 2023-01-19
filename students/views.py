from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from API.serializer import (
    StudentSerializer, StudentDashboardSerializer, StudentDetailSerializer,
    CourseDetailSerializer, TeacherSerializer, TeacherEditSerializer,
    TeacherStudentChatSerializer, NotificationSerializer
    ) #, StudentCourseEnrollSerializer

from .models import Student #, StudentCourseEnrollment
from teachers.models import Teacher, Course, TeacherStudentChat, Notification
# from accounts.models import Course
# Create your views here.

# Students' list
# 1
class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [permissions.IsAuthenticated]

# 2
@csrf_exempt
def student_login(request):
    email = request.POST['email']
    password = request.POST['password']
    
    # studentData = authenticate(request, email=email, password=password)
    try:
        studentData=Student.objects.get(email=email)
        studentData.check_password(password)
    except Student.DoesNotExist:
        studentData = None
    print(studentData)
    if studentData:
        return JsonResponse({'bool': True, 'student_id': studentData.id})
    else:
        return JsonResponse({'bool': False})

# 3
class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentDetailSerializer
    # permission_classes = [permissions.IsAuthenticated]

# 4
class StudentDashboard(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentDashboardSerializer

# 5
@csrf_exempt
def student_change_password(request, student_id):
    password = request.POST.get('password')

    try:
        studentData = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        studentData = None
    if studentData:
        Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

# 6
# class StudentEnrollCourseList(generics.ListCreateAPIView):
#     queryset = StudentCourseEnrollment.objects.all()
#     serializer_class = StudentCourseEnrollSerializer

@api_view(['GET'])
def StudentTeacherList(request,student_id):
    try:
        student=Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    teachers=student.get_teachers()
    serializer=TeacherEditSerializer(teachers, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def CourseStudentList(request,course_id):
    course = Course.objects.get(id=course_id)
    students = course.course_students()
    print(students)
    serializer=StudentSerializer(students,many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(["GET"])
def TeacherStudentList(request,teacher_id):
    teacher = Teacher.objects.get(id=teacher_id)
    queryset_lst = teacher.teacher_students()
    print(queryset_lst)
    # queryset.union(teacher.teacher_students()[1])
    serializer = StudentSerializer(queryset_lst, many=True) # many=True tells the serializer that this is a list or a queryset of objects not a single object being serialized
    # print(serializer)
    # students = serializers.serialize("json", teacher.teacher_students(), many=True)
    # print(students)
    return Response(serializer.data)

@api_view(['GET'])
def EnrolledStudentList(request,student_id):
    student=Student.objects.get(id=student_id)
    student_courses=student.enrolled_courses()
    serializer=CourseDetailSerializer(student_courses, many=True)
    return Response(serializer.data)

def fetch_enroll_status(request,student_id,course_id):
    try:
        student=Student.objects.get(id=student_id)
        course=Course.objects.get(id=course_id)
    except Student.DoesNotExist or Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if course in student.enrolled_courses():
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

class MessageList(generics.ListAPIView):
    queryset = TeacherStudentChat.objects.all()
    serializer_class = TeacherStudentChatSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        student_id = self.kwargs['student_id']
        teacher = Teacher.objects.get(pk=teacher_id)
        student = Student.objects.get(pk=student_id)
        return TeacherStudentChat.objects.filter(teacher=teacher, student=student).exclude(msg_text='')

class NotificationList(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        student = Student.objects.get(pk=student_id)
        return Notification.objects.filter(student=student, notif_for='student', notif_subject='assignment', notifiread_status=False)

@csrf_exempt
def save_teacher_student_msg(request, teacher_id, student_id):
    teacher = Teacher.objects.get(id=teacher_id)
    student = Student.objects.get(id=student_id)
    msg_text = request.POST.get('msg_text')
    msg_from = request.POST.get('msg_from')
    msgRes = TeacherStudentChat.objects.create(
        teacher=teacher,
        student=student,
        msg_text=msg_text,
        msg_from=msg_from,
    )
    if msgRes:
        msgs = TeacherStudentChat.objects.filter(
            teacher=teacher, student=student).count()
        return JsonResponse({'bool': True, 'msg': 'Message has been send', 'total_msg': msgs})
    else:
        return JsonResponse({'bool': False, 'msg': 'Oops... Some Error Occured!!'})


@csrf_exempt
def save_teacher_student_group_msg_from_student(request, student_id):
    student = Student.objects.get(id=student_id)
    msg_text = request.POST.get('msg_text')
    msg_from = request.POST.get('msg_from')

    # sql = f"SELECT * FROM teacher_course as c,main_studentcourseenrollment as e,main_teacher as t WHERE c.teacher_id=t.id AND e.course_id=c.id AND e.student_id={student_id} GROUP BY c.teacher_id"
    # qs = Course.objects.raw(sql)

    # myCourses = student.enrolled_courses()
    myTeachers = student.get_teachers() 
    for teacher in myTeachers:
        msgRes = TeacherStudentChat.objects.create(
            teacher=teacher,
            student=student,
            msg_text=msg_text,
            msg_from=msg_from,
        )
    if msgRes:
        return JsonResponse({'bool': True, 'msg': 'Message has been send'})
    else:
        return JsonResponse({'bool': False, 'msg': 'Oops... Some Error Occured!!'})


# 7
# def fetch_enroll_status(request, student_id, course_id):
#     student = Student.objects.filter(id=student_id).first()
#     course = Course.objects.filter(id=course_id).first()
#     enrollStatus = StudentCourseEnrollment.objects.filter(
#         course=course, student=student).count()

#     if enrollStatus:
#         return JsonResponse({'bool': True})
#     else:
#         return JsonResponse({'bool': False})

# 8
# class EnrolledStudentList(generics.ListAPIView):
#     queryset = StudentCourseEnrollment.objects.all()
#     serializer_class = StudentCourseEnrollSerializer

#     def get_queryset(self):
#         if 'course_id' in self.kwargs:
#             course_id = self.kwargs['course_id']
#             course = Course.objects.get(pk=course_id)
#             return StudentCourseEnrollment.objects.filter(course=course)
#         elif 'teacher_id' in self.kwargs:
#             teacher_id = self.kwargs['teacher_id']
#             teacher = Teacher.objects.get(pk=teacher_id)
#             return StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
#         elif 'student_id' in self.kwargs:
#             student_id = self.kwargs['student_id']
#             student = Student.objects.get(pk=student_id)
#             return StudentCourseEnrollment.objects.filter(student=student).distinct()