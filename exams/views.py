from django.shortcuts import render, HttpResponse, get_object_or_404
from django.http import JsonResponse

from django.views.generic import ListView
from .models import MCQ_Exam
from questions.models import Question, Answer, ClassicalAnswer
from results.models import Result
from accounts.decorators import unauthenticated_user

from rest_framework import generics
# from rest_framework import RetrieveUpdateDestroyAPIView

from API.serializer import ExamSerializer

# def Exams_List_View(request):
#     Exam=MCQ_Exam.objects.all()
#     context={
#         "object_list":Exam
#     }
#     return render(request,'exams/index.html',context)

class ExamsListView(ListView):
    model=MCQ_Exam
    template_name="exams/index.html"

class ExamDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MCQ_Exam.objects.all()
    serializer_class = ExamSerializer

# url: <id>/
def examView(request,id):
    exam = MCQ_Exam.objects.get(id=id)
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
    exam = MCQ_Exam.objects.get(id=id)
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
        'time': exam.time,
    })
    # return render(request,'exams/exam.html',context)

# defined this function below because request.is_ajax() above did not work 
def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

# url: <int:id>/submit/
def submitExamView(request,id=None):
    exam = get_object_or_404(MCQ_Exam,id=id)
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