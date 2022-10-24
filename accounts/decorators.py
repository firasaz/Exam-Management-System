from unicodedata import name
from django.http import HttpResponse
from django.shortcuts import redirect

def unauthenticated_user(view_func):
    
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('home')
        else:
            return view_func(request, *args, **kwargs)
    
    return wrapper_func

def allowed_users(allowed_roles = []):
    
    def decorator(view_func):
        
        def wrapper_func(request, *args, **kwargs):
            group = None
            if request.user.groups.exists(): # check if there are groups defined in the admin page
                group = request.user.groups.all()[0].name # if groups are there, get the first group of the specific user
                
            if group in allowed_roles: # allow a user to view the page the decorator is set above in views.py if his group corresponds to the argument given to that decorator
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponse(
                    'Unauthorized User  <a href="/logout/">logout</a>'
                    )
        
        return wrapper_func
    
    return decorator

def admin_only(view_func):
    def wrapper_func(request, *args, **kwargs):
        group = None
        if request.user.groups.exists():
            group = str(request.user.groups.all())
        
            if 'admin' in group:
                return view_func(request, *args, **kwargs)
            elif 'student' in group:
                return redirect('student')
        else:
            return HttpResponse(
                'User does not belong to any group <a href="/logout/">logout</a>'
            )
    return wrapper_func