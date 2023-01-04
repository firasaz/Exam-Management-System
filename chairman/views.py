from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework import generics
from .models import Chairman
from django.views.decorators.csrf import csrf_exempt

from API.serializer import ChairmanDashboardSerializer, ChairmanSerializer

# Create your views here.


class ChairmanList(generics.ListCreateAPIView):
    queryset = Chairman.objects.all()
    serializer_class = ChairmanSerializer
    # permission_classes = [permissions.IsAuthenticated]


class ChairmanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chairman.objects.all()
    serializer_class = ChairmanSerializer
    # permission_classes = [permissions.IsAuthenticated]


class ChairmanDashboard(generics.RetrieveAPIView):
    queryset = Chairman.objects.all()
    serializer_class = ChairmanDashboardSerializer


@csrf_exempt
def chairman_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        chairData = Chairman.objects.get(
            email=email, password=password)
    except Chairman.DoesNotExist:
        chairData = None
    if chairData:
        return JsonResponse({'bool': True, 'chair_id': chairData.id})
    else:
        return JsonResponse({'bool': False})


@csrf_exempt
def chairman_change_password(request, chair_id):
    password = request.POST['password']

    try:
        chairData = Chairman.objects.get(id=chair_id)
    except Chairman.DoesNotExist:
        chairData = None
    if chairData:
        Chairman.objects.filter(id=chair_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
