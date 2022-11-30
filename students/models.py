from django.db import models

# from accounts.models import Course
from teachers.models import Teacher, Course

# Student
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100, blank=True ,null=True)
    username = models.CharField(max_length=200)
    # profile_img = models.ImageField(upload_to='student_imgs/', null=True)


    class Meta:
        verbose_name_plural = "5. Student"

    def __str__(self):
        return self.full_name


    def enrolled_courses(self):
        enrolled_courses=StudentCourseEnrollment.objects.filter(student=self).count()
        return enrolled_courses

    def completed_assignments(self):
        completed_assignments=StudentAssignment.objects.filter(student=self, student_status=True).count()
        if completed_assignments > 0:
            return completed_assignments
        else:
            return 0
    def pending_assignments(self):
        pending_assignments=StudentAssignment.objects.filter(student=self, student_status=False).count()
        if pending_assignments>0:
            return pending_assignments
        else:
            return 0

# student course enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course}-{self.student}"

    class Meta:
        verbose_name_plural = "6. Enrolled Courses"

class StudentAssignment(models.Model):
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    title=models.CharField(max_length=200)
    detail=models.TextField(null=True)
    student_status=models.BooleanField(default=False, null=True)
    add_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural="7. Student Assignments"
