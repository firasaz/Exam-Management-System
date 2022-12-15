from django.db import models

# from accounts.models import Course
# from students.models import StudentCourseEnrollment
# from exams.models import MCQ_Exam


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


# Course model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    # featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    prerequisites = models.TextField(null=True,blank=True)

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