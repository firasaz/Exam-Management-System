from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, User
from django.utils.translation import gettext_lazy

from Users.models import NewUser

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
class Teacher(NewUser):
    # user=models.OneToOneField(User, on_delete=models.CASCADE)
    # full_name = models.CharField(max_length=100)
    # email = models.CharField(max_length=100)
    # password = models.CharField(max_length=100, blank=True, null=True)
    qualification = models.CharField(max_length=200)
    department = models.CharField(max_length=50)
    profile_img = models.ImageField(upload_to='static/images/teacher_imgs/', null=True, blank=True)

    class Meta:
        verbose_name_plural = "Teachers"
    
    def __str__(self):
        return f"{self.full_name}"

    def total_teacher_courses(self):
        total_courses=Course.objects.filter(teacher=self).count()
        return total_courses

    def teacher_courses(self):
        courses = Course.objects.filter(teacher=self)
        return courses

    def total_teacher_exams(self):
        counter=0
        courses=Course.objects.filter(teacher=self)
        for course in courses:
            for exam in course.course_exams():
                counter+=1
        return counter
    
    def teacher_exams(self):
        courses=Course.objects.filter(teacher=self)
        exams_lst=[]
        for course in courses:
            course_qs=course.course_exams()
            for cs in course_qs:
                exams_lst.append(cs)
        return exams_lst
    
    def total_teacher_students(self):
        courses=Course.objects.filter(teacher=self)
        total_students = 0
        student_lst=[]
        for course in courses:
            student_qs=course.course_students() # queryset of the students of course
            for std in student_qs: # iterate over each student in the queryset of course
                if std not in student_lst: # check if student has already been appended to student_lst from previous course
                    student_lst.append(std) # append unique students to student_lst
                    total_students+=1 # count unique students, not same students taking more than one course with same teacher
        return total_students
    
    def teacher_students(self):
        courses=Course.objects.filter(teacher=self) # returns a queryset of all the courses of that teacher
        # print(courses)
        students_lst=[]
        for course in courses:
            student_qs=course.course_students()
            for std in student_qs:
                if std not in students_lst:
                    students_lst.append(std) # return list of Student model objects
        return students_lst



# Course category model
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "Course Categories"

    def __str__(self):
        return self.title
    
    def courses(self):
        return self.course_category.all()


# Course model
class Course(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='static/images/course_imgs', null=True, blank=True)
    prerequisites = models.TextField(null=True,blank=True)
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name='course_category')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='course_teacher')
    student = models.ManyToManyField(Student, related_name='course_student', blank=True)

    class Meta:
        verbose_name_plural = "Course"

    def __str__(self):
        return self.title

    # returns all exams related to a certain course
    def course_exams(self):
        return self.examss.all()
    
    def course_teachers(self):
        return self.teacher
    
    def course_students(self):
        return self.student.all()

    # def total_enrolled_students(self):
    #     total_enrolled_students = StudentCourseEnrollment.objects.filter(
    #         course=self).count()
    #     return total_enrolled_students