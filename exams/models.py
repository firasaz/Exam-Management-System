from django.db import models
from django.urls import reverse
from teachers.models import Course, Teacher
from students.models import Student
# from questions.models import Question

# Create your models here.

# class MCQExam(models.Model):
#     question = models.CharField(max_length=100)
#     option1 = models.CharField(max_length=100,null=True)
#     option2 = models.CharField(max_length=100,null=True)
#     option3 = models.CharField(max_length=100,null=True)
#     option4 = models.CharField(max_length=100,null=True)
#     answer = models.CharField(max_length=100)

#     def __str__(self):
#         return "Question "+str(self.id)

#     class Meta:
#         verbose_name_plural="MCQ Exams"


# class ExamQuestions(models.Model):
#     exam = models.ForeignKey(Exam, on_delete=models.CASCADE, null=True)
#     question = models.CharField(max_length=200)
#     ans1 = models.CharField(max_length=200)
#     ans2 = models.CharField(max_length=200)
#     ans3 = models.CharField(max_length=200)
#     ans4 = models.CharField(max_length=200)
#     right_ans = models.CharField(max_length=200)
#     add_time = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         verbose_name_plural = "2.Exam Questions"

class Exam(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    number_of_questions = models.IntegerField()
    duration = models.IntegerField(help_text="duration of the exam(in mins.)")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True,related_name="examss")
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='exam_teacher') # foreign key creates a many-to-one field from exam to teacher (i.e. multiple exams to one teacher, no more no less)
    student = models.ManyToManyField(Student, related_name='exam_student', blank=True)

    class Meta:
        verbose_name_plural="1.Exams"

    def __str__(self):
        return f"Exam: {self.name}"
        # return "Exam "+str(self.id)

    def get_questions(self):
        return self.questions.all() #[:self.number_of_questions]
        
    def get_teacher(self):
        return self.course.teacher
    
    # def get_courses(self):
    #     return self.course
    def get_students(self):
        return self.student

    def get_absolute_url(self):
        return reverse("exams:exam-detail", kwargs={"id": self.id}) # need to specify the app name that we added in urls.py file


class AttemptExam(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, null=True)
    # question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)
    right_ans = models.CharField(max_length=200, null=True)
    add_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "2.Attempted Questions"

    def question(self):
        return self.exam.get_questions()

# class CourseExam(models.Model):
#     teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
#     exam = models.ForeignKey(Exam, on_delete=models.CASCADE, null=True)
#     add_time = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         verbose_name_plural = "11. Course Exam"

# class CourseCategory(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, default="")
#     title = models.CharField(max_length=100)
#     description = models.CharField(max_length=500)

#     class Meta:
#         verbose_name_plural="Course Categories"
