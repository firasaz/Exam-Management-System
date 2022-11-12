from django.urls import path, include

from .views import registerPage, loginPage, logoutPage, studentPage

# accounts/
urlpatterns = [
    path('register/', registerPage, name='register'),
    path('login/', loginPage, name='login'),
    path('logout/', logoutPage, name='logout'),
    path('user/', studentPage, name='student'),
    path('user/exam/', include('exams.urls')),
]