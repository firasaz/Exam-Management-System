from django.shortcuts import render, HttpResponse, get_object_or_404
from django.http import JsonResponse

from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt
from .models import Exam, AttemptExam
from questions.models import Question, Answer, ClassicalAnswer, ExamQuestionAnswers
from results.models import Result
from teachers.models import Course
from students.models import Student
from accounts.decorators import unauthenticated_user

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
# from rest_framework import RetrieveUpdateDestroyAPIView

from API.serializer import ExamSerializer, QuestionSerializer, AttemptExamSerializer, CourseEditSerializer, ExamEditSerializer

# def Exams_List_View(request):
#     Exam=MCQ_Exam.objects.all()
#     context={
#         "object_list":Exam
#     }
#     return render(request,'exams/index.html',context)

# class ExamDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Exam.objects.all()
#     serializer_class = ExamSerializer


class ExamQuestionList(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        exam_id = self.kwargs['exam_id']
        exam = Exam.objects.get(pk=exam_id)
        if 'limit' in self.kwargs:
            return exam.get_questions().order_by('id')[:1]
        elif 'question_id' in self.kwargs:
            current_question = self.kwargs['question_id']
            questions=exam.get_questions()
            return questions.filter(id__gt=current_question).order_by('id')[:1]
        else:
            return exam.get_questions()

class CourseExamList(generics.ListCreateAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = Course.objects.get(pk=course_id)
            return course.course_exams()

# class CourseExamList(generics.ListCreateAPIView):
#     queryset = CourseExam.objects.all()
#     serializer_class = CourseExamSerializer

#     def get_queryset(self):
#         if 'course_id' in self.kwargs:
#             course_id = self.kwargs['course_id']
#             course = Course.objects.get(pk=course_id)
#             return CourseExam.objects.filter(course=course)


def fetch_exam_assign_status(request, exam_id, course_id):
    # exam = Exam.objects.filter(id=exam_id).first()
    # course = Course.objects.filter(id=course_id).first()
    # assignStatus = CourseExam.objects.filter(course=course, exam=exam).count()

    try:
        exam = Exam.objects.get(id=exam_id)
    except Exam.DoesNotExist:
        exam = None
    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        course = None
    
    assignStatus = course.course_exams().filter(name=exam).count()
    if assignStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class AttemptExamList(generics.ListCreateAPIView):
    queryset = AttemptExam.objects.all()
    serializer_class = AttemptExamSerializer

    def get_queryset(self):
        if 'exam_id' in self.kwargs:
            exam_id = self.kwargs['exam_id']
            exam = Exam.objects.get(pk=exam_id)
            return AttemptExam.objects.raw(f'SELECT * FROM main_attempexam WHERE exam_id={int(exam_id)} GROUP by student_id')


def fetch_exam_attempt_status(request, exam_id, student_id):
    exam = Exam.objects.filter(id=exam_id).first()
    student = Student.objects.filter(id=student_id).first()
    # exam_questions = exam.get_questions()
    attemptStatus = AttemptExam.objects.filter(student=student, exam=exam).count() # searches for a record for a certain student in a certain exam
    # attemptStatus = AttemptExam.objects.filter(student=student, question__exam=exam).count()
    # print(AttemptExam.objects.filter(student=student, question__exam=exam).query)
    print(attemptStatus)
    print()
    print(AttemptExam.objects.filter(student=student, exam=exam).query)
    print(AttemptExam.objects.filter(student=student, exam=exam))
    if attemptStatus > 0:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

# this is not right

# @api_view(['GET'])
# def fetch_exam_attempt_status(request, course_id):
#     try:
#         course=Course.objects.get(id=course_id)
#     except Course.DoesNotExist:
#         course=None
    
#     if course:
#         exams = course.course_exams()
#         serializer = ExamSerializer(exams, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     return Response(status=status.HTTP_404_NOT_FOUND)


def fetch_exam_result(request, exam_id, student_id):
    exam = Exam.objects.filter(id=exam_id).first()
    student = Student.objects.filter(id=student_id).first()
    total_questions = exam.get_questions().count()
    total_attempted_questions = AttemptExam.objects.filter(exam=exam, student=student).values('student').count()
    attempted_questions = AttemptExam.objects.filter(exam=exam, student=student)

    total_correct_questions = 0
    for attempt in attempted_questions:
        if attempt.right_ans == attempt.question.right_ans:
            total_correct_questions += 1

    return JsonResponse({'total_questions': total_questions, 'total_attempted_questions': total_attempted_questions, 'total_correct_questions': total_correct_questions})

# def fetch_exam_attempt_status(request, exam_id, student_id):
#     exam = Exam.objects.filter(id=exam_id).first()
#     student = Student.objects.filter(id=student_id).first()
#     attemptStatus = AttemptExam.objects.filter(
#         student=student, question__exam=exam).count()
#     print(AttemptExam.objects.filter(
#         student=student, question__exam=exam).query)
#     if attemptStatus > 0:
#         return JsonResponse({'bool': True})
#     else:
#         return JsonResponse({'bool': False})

class ExamsListView(ListView):
    model=Exam
    template_name="exams/index.html"

class ExamDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

@api_view(['GET','PUT'])
def exam_edit(request,pk):
    exam=Exam.objects.get(id=pk)
    if request.method == 'GET':
        serializer=ExamEditSerializer(exam)
        return Response(serializer.data)
    elif request.method == 'PUT':    
        serializer=ExamEditSerializer(exam, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors) # adding the status method here causes 400 bad request

@api_view(['GET'])
def exam_question_list(request,exam_id):
    try:
        exam = Exam.objects.get(id=exam_id)
    except Exam.DoesNotExist:
        exam=None
    if exam:
        serializer = QuestionSerializer(exam.get_questions(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def SubmitExamView(request, exam_id):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode) #this returns a dictionary of question and the student's answer
    body_keys = body.keys()
    print(body_keys)

    # print(len(request.POST))
    student_id= int(body["student"])
    # print(body)
    try:
        exam = Exam.objects.get(id = exam_id)
    except Exam.DoesNotExist:
        exam = None
    
    try:
        student = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        student = None
    
    # print(exam)
    if exam:
        questions = list(exam.get_questions()) # returns a list of exam objects instead of a queryset
        # questions_answered = []
        # print(questions)
        
        # for q in questions:
        #     question_names.append(q.question)

        for q in body_keys:
            if q != 'exam' and q!= 'student':
                print(q)
                try:
                    question_answered = Question.objects.get(id=q)
                    print(question_answered.type)
                except Question.DoesNotExist:
                    question_answered = None
                
                ExamQuestionAnswers.objects.create(student=student, exam=exam, question=question_answered, question_points=question_answered.points, answer_mcq=body[q])


    return JsonResponse({"savage":"piris"})



# url: <id>/
def examView(request,id):
    exam = Exam.objects.get(id=id)
    context = {
        'obj':exam
    }

    print(context)
    
    # if request.is_ajax():
    #     data = request.POST
    #     data_ = dict(data.lists())
    #     print(data_)
    #     data_.pop("csrfmiddlewaretoken")
    #     print(data_)
    return render(request, 'exams/exam-detail.html',context)

# url: <int:id>/take/
def takeExamView(request,id):
    exam = Exam.objects.get(id=id)
    questions_dict = {}
    print(exam.get_questions())
    for q in exam.get_questions(): # loop over the questions of the exam
        if q.get_type() == "MCQ": # if the question was a MCQ, loop over the choices and add them to the answers list
            answers_list = []
            for a in q.get_answers():
                answers_list.append(a.text)
            questions_dict[str(q)] = answers_list # add each question as a key and the list of choices related with it as a value
            # questions_dict.append({str(q): answers_list})
        elif q.get_type() == "Classical Question": # else if the question was a classical question, 
            questions_dict[str(q)] = "classical question" # add the question as a key and "classical question" as a value
    context = {
        'obj':questions_dict
    }
    
    # print(request.GET)
    # print(request.POST)
    return JsonResponse({
        'data': questions_dict,
        'time': exam.duration,
    })
    # return render(request,'exams/exam.html',context)

# defined this function below because request.is_ajax() above did not work 
def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

# url: <int:id>/submit/
def submitExamView(request,id=None):
    exam = get_object_or_404(Exam,id=id)
    if is_ajax(request=request):
        message = "This is ajax"
        data = request.POST # this returns a QueryDict(which is the dataDict in the exam.js file)
        data_ = dict(data.lists()) # this gives us the data as a python dictionary
        data_.pop("csrfmiddlewaretoken") # we remove the csrf token and leave the questions and answers

        questions = []
        for key in data_.keys():
            # print("Key: ",key)
            # question = get_object_or_404(Question, id=key[1]) # to get the id of the question since i am giving the "Q"+Question object id
            question = get_object_or_404(Question, text=key)
            questions.append(question) # create a questions list of all the questions submitted in the exam
        print(questions)

        user = request.user
        
        score = 0
        multiplier = 100/exam.number_of_questions
        results = []
        correct_answer = None

        for q in questions:
            # i am sending the name of the question to the html page which used the __str__ method in the model and this is how i'm managing that for now
            # selected_ans = request.POST.get("Q"+str(q.id)) # this is really dumb. but it works tho ;)
            
            # q is the question object string whereas the request.POST.get() needs a string key value
            selected_ans = request.POST.get(str(q))

            print(selected_ans)
            if q.get_type() == "Classical Question":
                ClassicalAnswer.objects.create(text=selected_ans, question=q, user=user)
                results.append(
                    {
                        str(q): selected_ans
                    }
                )
            elif selected_ans != "":
                # we're getting the answers for the questions that were answered
                question_answers = Answer.objects.filter(question=q)
                for ans in question_answers:
                    if selected_ans == ans.text:
                        if ans.correct:
                            score += 1
                            correct_answer = ans.text
                    else:
                        if ans.correct:
                            correct_answer = ans.text
                results.append(
                    {
                        str(q): { "answered":selected_ans, "correct_answer":correct_answer }
                        }
                    )
            else:
                results.append({str(q):"not answered"})
        
        score_= score * multiplier
        Result.objects.create(exam=exam, user=user, score=score_)
        
    else:
        message = "Not ajax"
        print(message)
    return JsonResponse({
        "results": results,
        "score": score_,
        }
    )