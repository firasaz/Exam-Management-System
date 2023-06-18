from django.shortcuts import render, get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializer import ExamSerializer, QuestionSerializer, AddQuestionSerializer, AnswerSerializer, AddExamSerializer
from exams.models import Exam
from questions.models import Question, Answer
# Create your views here.

@api_view(["GET","POST","PUT"])
def getAnswerData(request, answer_id=None):
    try:
        answer_obj = Answer.objects.get(id=answer_id) if answer_id else Answer.objects.all()
    except Answer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = AnswerSerializer(answer_obj) if answer_id else AnswerSerializer(answer_obj, many = True)
        return Response(serializer.data)
    elif request.method == "POST":
        print(request.data)
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT":
        serializer = AnswerSerializer(answer_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET","POST"])
def getQuestionsData(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)
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
def getExamData(request, exam_id=None):
    if exam_id:
        exam=get_object_or_404(Exam, id=exam_id)
        if exam:
            serializer=ExamSerializer(exam)
            return Response(serializer.data)
    exams = Exam.objects.all()
    serializer = ExamSerializer(exams, many=True)
    return Response(serializer.data)

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


@api_view(['GET','POST','PUT'])
def add_question(request, question_id=None):
    if question_id:
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        try:
            questions=Question.objects.all()
        except Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        if question_id:
            serializer = QuestionSerializer(question)
            return Response(serializer.data)
        else:
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
    elif request.method == "PUT":
        serializer = AddQuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def edit_question_view(request, question_id):
    try:
        question = Question.objects.get(id=question_id)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = QuestionSerializer(question)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
