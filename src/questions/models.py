from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

from students.models import Student
from exams.models import Exam

class Question(models.Model):
    qtype = (
        ("Classical Question", "Classical Question"),
        ("MCQ", "Multiple Choice")
    )
    question = models.CharField(max_length=200)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')
    type = models.CharField(max_length=20, choices=qtype,default="MCQ")
    points = models.IntegerField(verbose_name='question points')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.question}"
        # return f"Q{self.id}"
    
    def get_answers(self):
        return self.answers.all() # used the related_name variable assigned in the Answer model below
    
    def get_correct_answer(self):
        return self.answers.get(correct=True) 
    
    def get_classical(self):
        return self.classical_answer.all()
    
    def get_type(self):
        return f"{self.type}"

class Answer(models.Model):
    text = models.CharField(max_length=200)
    correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE,related_name='answers')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Question:{self.question.question}; Answer:{self.text}; Correct:{self.correct}"

class ClassicalAnswer(models.Model):
    text = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="classical_answer",null=True)
    user = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="classical_answer_user",null=True)

    def __str__(self):
        return f"Answer: {self.text} | Question: {self.question} | Student: {self.user}"
    


class ExamQuestionAnswers(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='student_ans')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    # question_points = models.IntegerField(help_text='question holds how many points.')
    # answer_mcq = models.CharField(max_length=100, null=True, blank=True)
    answer_mcq = models.ForeignKey(Answer, on_delete=models.CASCADE, null=True, blank=True)
    # answer_classical = models.ImageField(upload_to='static/images/answers_imgs', null=True, blank=True)
    add_time = models.DateTimeField(auto_now_add=True)
    # correct_ans = models.ForeignKey(Answer, on_delete=models.CASCADE , null=True, blank=True)
    ans_status = models.BooleanField(verbose_name='answered choice is correct or not')
    
    def __str__(self):
        return f'{self.student} answers for {self.exam}'