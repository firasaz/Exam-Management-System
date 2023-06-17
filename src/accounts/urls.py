from django.urls import path, include

from .views import registerPage, loginPage, logoutPage, studentPage, loginPageReact, registerPageReact

app_name = 'accounts'
# accounts/
urlpatterns = [
    path('register/', registerPage, name='register'),
    path('login/', loginPage, name='login'),
    path('logout/', logoutPage, name='logout'),
    path('user/', studentPage, name='student'),
    path('user/exam/', include('exams.urls')),

    path('loginn/',loginPageReact, name='react_login'),
    path('registerr/',registerPageReact, name='react_register'),
    
]