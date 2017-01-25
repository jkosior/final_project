"""final_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.conf import settings
from django.contrib import admin
from game.views import BeingList, WeaponList, BeingDetail, WeaponDetail,\
    ArmorList, ArmorDetail, maps, AddUserView, PlayerCreateView,\
    PlayerDeleteView
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^map/beings/$', BeingList.as_view(), name = 'being-list'),
    url(r'^map/beings/(?P<pk>(\d)+)$', BeingDetail.as_view(), name = 'being-detail'),
    url(r'^map/weapons/$', WeaponList.as_view(), name = 'weapon-list'),
    url(r'^map/weapons/(?P<pk>(\d)+)$', WeaponDetail.as_view(), name = 'weapon-detail'),
    url(r'^map/armors/$', ArmorList.as_view(), name = 'armor-list'),
    url(r'^map/armors/(?P<pk>(\d)+)$', ArmorDetail.as_view(), name = 'armor-detail'),
    url(r'^map/?$', maps, name = "map"),
    url(r'^players/?$', PlayerCreateView.as_view(), name = 'player'),
    url(r'^players_delete/?$', PlayerDeleteView.as_view(), name = 'player_delete'),
    url(r'^login/$', auth_views.login, {'template_name': 'game/login.html'}, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': '/login/'}, name='logout'),
    url(r'^create/$',AddUserView.as_view(), name = 'create')
]  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
