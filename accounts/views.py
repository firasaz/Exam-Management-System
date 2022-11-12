from django.shortcuts import render, redirect

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group

from .forms import CreateUserForm
from .decorators import unauthenticated_user, allowed_users, admin_only
# Create your views here.

@login_required(login_url='login') # to allow logged in users only to go to home page
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
    return redirect('login')

@login_required(login_url='login')
def studentPage(request):
    context = {}
    return render(request, 'accounts/student.html',context)
