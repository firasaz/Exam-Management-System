from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from API.serializer import TeacherSerializer,TeacherDashboardSerializer, CourseSerializer

from .models import Teacher
from .models import Course

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

# 4
@csrf_exempt
def teacher_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    print(email)
    print(password)
    try:
        teacherData = Teacher.objects.get(
            email=email, password=password)
    except Teacher.DoesNotExist:
        teacherData = None
    print(teacherData)
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