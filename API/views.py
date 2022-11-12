from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import ExamSerializer, QuestionSerializer, AnswerSerializer
from exams.models import MCQ_Exam
from questions.models import Question, Answer
# Create your views here.

@api_view(["GET"])
def getAnswerData(request):
    answers = Answer.objects.all()
    serializer = AnswerSerializer(answers, many = True)
    return Response(serializer.data)

@api_view(["GET"])
def getQuestionsData(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many = True)
    return Response(serializer.data)

@api_view(["GET"])
def getExamData(request):
    exams = MCQ_Exam.objects.all()
    serializer = ExamSerializer(exams, many = True)
    return Response(serializer.data)
