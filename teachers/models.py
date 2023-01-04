from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, User
from django.utils.translation import gettext_lazy

# from accounts.models import Course
# from students.models import StudentCourseEnrollment
# from exams.models import MCQ_Exam
from students.models import Student

# class TeacherAccountManager(BaseUserManager):
#     def create_superuser(self, full_name, email, password, **other_fields):
#         other_fields.setdefault('is_staff', True)
#         other_fields.setdefault('is_active', True)
#         other_fields.setdefault('is_superuser', True)

#         if other_fields.get('is_staff') is not True:
#             raise ValueError(
#                 "Superuser must be assigned to is_staff=True."
#             )
#         if other_fields.get('is_superuser') is not True:
#             raise ValueError(
#                 "Superuser must be assigned to is_superuser=True."
#             )
        
#         return self.create_user(full_name, email, password, **other_fields)
    
#     def create_user(self, full_name, email, password, **other_fields):
#         if not email:
#             raise ValueError(gettext_lazy("You must provide an email address"))
#         email = self.normalize_email(email)
#         user = self.model(full_name=full_name, email=email, **other_fields)
#         user.set_password(password)
#         user.save()
#         return user

# class TeacherUser(AbstractBaseUser, PermissionsMixin):
#     full_name = models.CharField(max_length=100)
#     email = models.CharField(max_length=100,unique=True)
#     password = models.CharField(max_length=100, blank=True, null=True)
#     qualification = models.CharField(max_length=200)
#     department = models.CharField(max_length=50)
#     # profile_img = models.ImageField(upload_to='teacher_imgs/', null=True)

#     is_staff = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=False)

#     objects = TeacherAccountManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['full_name','password']

#     class Meta:
#         verbose_name_plural = "Teacherss"
    
#     def __str__(self):
#         return f"{self.full_name}"

#     def total_teacher_courses(self):
#         total_courses=Course.objects.filter(teacher=self).count()
#         return total_courses

#     def total_teacher_exams(self):
#         counter=0
#         courses=Course.objects.filter(teacher=self)
#         for course in courses:
#             for exam in course.course_exams():
#                 counter+=1
#         return counter

#     # def total_teacher_courses(self):
#     #     total_students = StudentCourseEnrollment.objects.filter(course_teacher=self).count()
#     #     return total_students

# Teacher
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100, blank=True, null=True)
    qualification = models.CharField(max_length=200)
    department = models.CharField(max_length=50)
    # profile_img = models.ImageField(upload_to='teacher_imgs/', null=True)


    class Meta:
        verbose_name_plural = "Teachers"
    
    def __str__(self):
        return f"{self.full_name}"

    def total_teacher_courses(self):
        total_courses=Course.objects.filter(teacher=self).count()
        return total_courses

    def total_teacher_exams(self):
        counter=0
        courses=Course.objects.filter(teacher=self)
        for course in courses:
            for exam in course.course_exams():
                counter+=1
        return counter

    # def total_teacher_courses(self):
    #     total_students = StudentCourseEnrollment.objects.filter(course_teacher=self).count()
    #     return total_students


# Course category model
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "3. Course Categories"

    def __str__(self):
        return self.title
    
    def courses(self):
        return self.course_category.all()


# Course model
class Course(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    # featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    prerequisites = models.TextField(null=True,blank=True)
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name='course_category')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='course_teacher')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='course_student', null=True)

    class Meta:
        verbose_name_plural = "4. Course"

    def __str__(self):
        return self.title

    # returns all exams related to a certain course
    def course_exams(self):
        return self.examss.all()

    # def total_enrolled_students(self):
    #     total_enrolled_students = StudentCourseEnrollment.objects.filter(
    #         course=self).count()
    #     return total_enrolled_students