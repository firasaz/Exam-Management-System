from django.contrib.auth.forms import UserCreationForm # to inherit the form then customize it here as desired
from django.contrib.auth.models import User # to inherit the users page in the admin page
# from django import forms

class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password1",
            "password2"
        ]
