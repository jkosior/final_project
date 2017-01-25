from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from game.models import Being, Weapon, Armor, Player
from django.http.response import Http404, HttpResponseRedirect
from django.views import generic
from game.serializers import BeingSerializer, WeaponSerializer, ArmorSerializer, PlayerSerializer
from django.views.generic.edit import FormView, CreateView, DeleteView
from game.forms import UserForm, PlayerForm 
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.views.generic.base import View
from django.utils.decorators import method_decorator
from django.template.context_processors import request
from game.forms import AddUserForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
# from django.contrib.sessions.models import Session


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

class PlayerList(generics.ListCreateAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    
class PlayerCreateView(LoginRequiredMixin,CreateView):
    model = Player
    form_class = PlayerForm
    template_name = 'game/player.html'
    success_url = '/map/'
    
    def form_valid(self, form):
        player = form.save(commit = False)
        player.user = User.objects.get(username = self.request.user)
        player.save()
        self.request.session['avatar'] = player.avatar.name
        print(self.request.session['avatar'])
        return HttpResponseRedirect(self.success_url)
    
    
class PlayerDeleteView(DeleteView):
    model = Player
    fields = ['name','avatar']
    template_name_suffix = '_delete'
    success_url = '/players/'
    
    

@login_required
def maps(request):
    return render(request, 'game/map.html')

class AddUserView(View):
    def get(self, request):
        form = AddUserForm
        return render(request, 'game/create.html', {'form': form})
    
    
    def post(self, request):
        form = AddUserForm(request.POST)
        success_url = '/login/'
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            password2 = form.cleaned_data['password2']
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            email = form.cleaned_data['email']
            if password == password2:
                try: 
                    User.objects.get(username = username)
                except User.DoesNotExist: 
                    new_user = User.objects.create_user(username, email, password)
                    new_user.first_name = first_name
                    new_user.last_name = last_name
                    new_user.email = email
                    new_user.save()
                    return HttpResponseRedirect(success_url)
                form.add_error(None, "User exists")
                return render(request, "game/create.html", {"form": form})
            else:
                form.add_error(None, "Password must repeat")
                return render(request, "game/create.html", {"form": form})
        else:
            form.add_error(None, "POST ERROR")
            return render(request, "game/create.html", {"form": form})