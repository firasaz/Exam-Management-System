from django.shortcuts import render

# Create your views here.
from .models import ClassicalExam

def examView(request):
    
    return render(request,'exams/index.html')