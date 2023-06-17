"""LMS URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include

from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    re_path('^$', TemplateView.as_view(template_name="index.html")),
    path('admin/', admin.site.urls),
    
    path('account/',include('accounts.urls')),
    path('api/',include('API.urls')),
    # path('api/exam/', getExamData, name='examAPI'),
    # path('api/question/', getQuestionsData, name='questionAPI'),
    # path('api/answer/', getAnswerData, name='answerAPI'),
    path("user/exam/", include('exams.urls'))
] + static(settings.STATIC_URL, )
