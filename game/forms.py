from django import forms
from game.models import Player 
from django.forms.models import ModelForm
from django.forms.widgets import PasswordInput,  RadioSelect
from django.contrib.auth.models import User


class PlayerForm(ModelForm):
    class Meta:
        model = Player
        fields = ['name','avatar']
        widgets = {
            'avatar':RadioSelect()}
        

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username','password']
        widgets = {
            'password': PasswordInput()
            }


class AddUserForm(forms.Form):
    username = forms.CharField(max_length=64, label="Username")
    password1 = forms.CharField(widget=forms.PasswordInput, label="Password")
    password2 = forms.CharField(widget=forms.PasswordInput, label="Repeat password")
    first_name = forms.CharField(max_length=64, label="Name")
    last_name = forms.CharField(max_length=64, label="Surname")
    email = forms.EmailField(label="e-mail")