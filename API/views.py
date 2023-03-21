from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import ExamSerializer, QuestionSerializer, AddQuestionSerializer, AnswerSerializer, AddExamSerializer
from exams.models import Exam
from questions.models import Question, Answer
# Create your views here.

@api_view(["GET","POST"])
def getAnswerData(request):
    try:
        answers = Answer.objects.all()
    except Answer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # print(answers)
    # print(type(answers))
    if request.method == "GET":
        serializer = AnswerSerializer(answers, many = True)
        return Response(serializer.data)
    elif request.method == "POST":
        print(request.data)
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET","POST"])
def getQuestionsData(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many = True)
    return Response(serializer.data)

@api_view(["GET","DELETE"])
def deleteQuestion(request,question_id):
    try:
        question=Question.objects.get(id=question_id)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = QuestionSerializer(question)
        return Response(serializer.data)
    elif request.method == "DELETE":
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["GET","PUT"])
def getExamData(request):
    exams = Exam.objects.all()
    serializer = ExamSerializer(exams, many = True)
    return Response(serializer.data)


@api_view(['GET','POST'])
def add_question(request):
    try:
        questions=Question.objects.all()
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer=AddQuestionSerializer(questions, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        # ans=request.data.pop('answers')
        # print(ans)
        # print(request.data['answers'])
        serializer=AddQuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# POST request on this view returns:
# Expected a `Response`, `HttpResponse` or `HttpStreamingResponse` to be returned from the view, but received a `<class 'NoneType'>`
# update; 
# turned out for the POST method i wrote: request == "POST" instead of request.method == "POST"
@api_view(["GET","POST"])
def addExamData(request):
    if request.method == "GET":
        exams = Exam.objects.all()
        serializer=AddExamSerializer(exams, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = AddExamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
