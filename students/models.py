from django.db import models

from Users.models import NewUser
# from accounts.models import Course
# from teachers.models import Teacher, Course

# Student
class Student(NewUser):
    # user=models.OneToOneField(User, on_delete=models.CASCADE)
    # full_name = models.CharField(max_length=100)
    # email = models.CharField(max_length=100, unique=True)
    # password = models.CharField(max_length=100, blank=True ,null=True)
    # username = models.CharField(max_length=200)
    profile_img = models.ImageField(upload_to='static/images/student_imgs/', null=True, blank=True)

    class Meta:
        verbose_name_plural = "Students"

    def __str__(self):
        return self.full_name
    
    def get_teachers(self):
        courses = self.enrolled_courses()
        teachers=[]
        for course in courses:
            _teacher = getattr(course, 'teacher')
            if _teacher not in teachers:
                teachers.append(_teacher)
        return teachers
    
    # def get_exams(self):
    #     courses = self.enrolled_courses() # get all courses for student
    #     exams={}
    #     for course in courses: # iterate over every course
    #         exam_lst=[] # create an exam list for every course
    #         for exam in course.course_exams(): # iterate over every exam in every course
    #             exams[course] = exam_lst.append(exam) # store a key/value pair of course and exam list for that course
    #     return exams
    
    def enrolled_courses(self):
        return self.course_student.all() # course_student is the related name for the Student-Course relation

    def total_enrolled_courses(self):
        return self.course_student.all().count()

    def completed_assignments(self):
        completed_assignments=StudentAssignment.objects.filter(student=self, student_status=True).count()
        return completed_assignments
    
    def pending_assignments(self):
        pending_assignments=StudentAssignment.objects.filter(student=self, student_status=False).count()
        return pending_assignments
    
    def get_exams(self):
        courses = self.enrolled_courses() # get all courses for student
        # print("get_exams:",courses)
        exams=[]
        for course in courses: # iterate over every course
            for exam in course.course_exams():
                exams.append(exam)
        return exams

    def total_exams(self):
        courses = self.enrolled_courses() # get all courses for student
        # print("get_exams:",courses)
        exams=[]
        for course in courses: # iterate over every course
            for exam in course.course_exams():
                exams.append(exam)
        return len(exams)

# student course enrollment
# class StudentCourseEnrollment(models.Model):
#     course = models.ForeignKey(
#         Course, on_delete=models.CASCADE, related_name='enrolled_courses')
#     student = models.ForeignKey(
#         Student, on_delete=models.CASCADE, related_name='student_courses')
#     enrolled_time = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.course}-{self.student}"

#     class Meta:
#         verbose_name_plural = "6. Enrolled Courses"

class StudentAssignment(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    title=models.CharField(max_length=200)
    detail=models.TextField(null=True)
    student_status=models.BooleanField(default=False, null=True)
    add_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural="7. Student Assignments"

    def __str__(self):
        return self.title
    
    def teacher(self):
        return self.get_teachers()

