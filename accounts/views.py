from django.shortcuts import render, redirect

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Teacher
from .forms import CreateUserForm
from .decorators import unauthenticated_user, allowed_users, admin_only
# Create your views here.

@login_required(login_url='accounts:login') # to allow logged in users only to go to home page
@admin_only
def homePage(request):
    context = {}
    return render(request, 'accounts/home.html', context)

@unauthenticated_user
def registerPage(request):
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            # print("form is valid!")
            user = form.save()
            username = form.cleaned_data.get("username")

            group = Group.objects.get(name='student')
            user.groups.add(group)

            form = CreateUserForm()
            messages.success(request, 'Succesfully created ' + username)

    context = {"form":form}
    return render(request, 'accounts/register.html', context)

@unauthenticated_user
def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username') # "username" is retreived from the html file where the name of the input tag is "username"
        password = request.POST.get('password') # "password" is retreived from the html file where the name of the input tag is "password"

        user = authenticate(request, username=username, password=password)
        print(user.id)
        # print(user)
        if user is not None:
            login(request, user)
            return redirect("home")
        else:
            messages.info(request, 'username or password is incorrect')


    context={}
    return render(request, 'accounts/index.html', context)

def logoutPage(request):
    logout(request)
    return redirect('accounts:login')

@login_required(login_url='login')
def studentPage(request):
    context = {}
    return render(request, 'accounts/student.html',context)

@csrf_exempt
def teacher_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    print("email: ", email)
    print("password: ", password)
    try:
        teacherData = Teacher.objects.get(
            email=email, password=password)
    except Teacher.DoesNotExist:
        teacherData = None
    print("teacherData: ", teacherData)
    if teacherData:
        return JsonResponse({'bool': True, 'teacher_id': teacherData.id})
    else:
        return JsonResponse({'bool': False})
