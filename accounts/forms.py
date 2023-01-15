from django.contrib.auth.forms import UserCreationForm # to inherit the 'User' form then customize it here as desired
from django.contrib.auth.models import User # to inherit the users page in the admin page
from django import forms

class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password1",
            "password2"
        ]

class RegisterTeacherFormReact(UserCreationForm):
    full_name = forms.CharField(
        widget=forms.TextInput(attrs={'class':'form-control'}),
        max_length=50,
        label='full_name'
    )
    email = forms.EmailField(
        widget=forms.TextInput(attrs={'class':'form-control'}),
        max_length=150,
        label='email'
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class':'form-control'}),
        max_length=50,
        label='password'
    )
    qualification = forms.CharField(
        widget=forms.TextInput(attrs={'class':'form-control'}),
        max_length=50,
        label='qualification'
    )
    department = forms.CharField(
        widget=forms.TextInput(attrs={'class':'form-control'}),
        max_length=50,
        label='department'
    )
    class Meta:
        model = User
        fields = [
            "full_name",
            "email",
            "password",
            "qualification",
            "department"
        ]
