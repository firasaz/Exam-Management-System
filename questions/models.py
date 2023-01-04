from django.db import models
from exams.models import MCQ_Exam
from django.contrib.auth.models import User
from django.conf import settings

class Question(models.Model):
    qtype = (
        ("Classical Question", "Classical Question"),
        ("MCQ", "Multiple Choice")
    )
    text = models.CharField(max_length=200)
    exam = models.ForeignKey(MCQ_Exam, on_delete=models.CASCADE, related_name='questions')
    type = models.CharField(max_length=20, choices=qtype,default="MCQ")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.text}"
        # return f"Q{self.id}"
    
    def get_answers(self):
        return self.answers.all() # used the related_name variable assigned in the Answer model below
    
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
        return f"Question:{self.question.text}; Answer:{self.text}; Correct:{self.correct}"

class ClassicalAnswer(models.Model):
    text = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="classical_answer",null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="classical_answer_user",null=True)

    def __str__(self):
        return f"Answer: {self.text}; Question: {self.question}; Student: {self.user}"
    

