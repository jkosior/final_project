from django.contrib import admin
from game.models import Being, Weapon, Armor, Player

# Register your models here.

@admin.register(Being)
class AdminBeing(admin.ModelAdmin):
    list_display = ['name', 'health', 'experience', 'weapon', 'armor', 'is_playable']
    
@admin.register(Weapon)
class AdminWeapon(admin.ModelAdmin):
    list_display = ['name','min_att_value','max_att_value']
    
@admin.register(Armor)
class AdminArmor(admin.ModelAdmin):
    list_display = ['name','armor_value']
    
@admin.register(Player)
class AdminPlayer(admin.ModelAdmin):
    list_display = ['user','avatar','score']