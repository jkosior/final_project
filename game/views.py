from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from game.models import Being, Weapon, Armor, Player
from django.http.response import Http404
from django.views import generic
from game.serializers import BeingSerializer, WeaponSerializer, ArmorSerializer
from django.views.generic.edit import FormView
from game.forms import UserForm, PlayerForm 
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.views.generic.base import View
from django.utils.decorators import method_decorator
from django.template.context_processors import request
from game.forms import AddUserForm

# Create your views here.


class BeingList(generics.ListCreateAPIView):
    queryset = Being.objects.all()
    serializer_class = BeingSerializer
    
class BeingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Being.objects.all()
    serializer_class = BeingSerializer
    
class WeaponList(generics.ListCreateAPIView):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer
    
class WeaponDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer

class ArmorList(generics.ListCreateAPIView):
    queryset = Armor.objects.all()
    serializer_class = ArmorSerializer
    
class ArmorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Armor.objects.all()
    serializer_class = ArmorSerializer
    
class PlayerFormView(View):
    def get(self, request):
        form = PlayerForm
        if request.user.is_authenticated():
            current_user = request.user.username
            return render(request,'game/player.html', {"form":form})
        else:
            raise Http404
    
    

# @login_required
def maps(request):
    return render(request, 'game/map.html')

class AddUserView(View):
    def get(self, request):
        form = AddUserForm
        return render(request, 'game/create.html', {'form': form})
    
    
    def post(self, request):
        form = AddUserForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            password2 = form.cleaned_data['password2']
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            email = form.cleaned_data['email']
            if password == password2:
                user = authenticate(username=username, password=password)
                if user is None:
                    new_user = User.objects.create_user(username, email, password)
                    new_user.first_name = first_name
                    new_user.last_name = last_name
                    new_user.email = email
                    new_user.save()
                    return render(request, 'game/login.html')
                else:
                    form.add_error(None, "User exists")
                    return render(request, "game/create.html", {"form": form})
            else:
                form.add_error(None, "Password must repeat")
                return render(request, "game/create.html", {"form": form})
        else:
            form.add_error(None, "POST ERROR")
            return render(request, "game/create.html", {"form": form})
            