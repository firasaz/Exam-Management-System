from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import ExamSerializer, QuestionSerializer, AnswerSerializer, AddExamSerializer
from exams.models import MCQ_Exam
from questions.models import Question, Answer
# Create your views here.

@api_view(["GET","POST"])
def getAnswerData(request):
    answers = Answer.objects.all()
    print(answers)
    print(type(answers))
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

@api_view(["GET","POST"])
def addExamData(request):
    if request.method == "GET":
        exams = MCQ_Exam.objects.all()
        serializer=ExamSerializer(exams, many=True)
        return Response(serializer.data)
    elif request == "POST":
        print(request)
        serializer = AddExamSerializer(data=request.data)
        print(serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
