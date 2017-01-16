from django.contrib import admin
from game.models import Being, Weapon, Armor

# Register your models here.

@admin.register(Being)
class AdminBeing(admin.ModelAdmin):
    list_display = ['name', 'health', 'mana', 'weapon', 'armor','image']
    

@admin.register(Weapon)
class AdminWeapon(admin.ModelAdmin):
    list_display = ['name','min_att_value','max_att_value']
    

@admin.register(Armor)
class AdminArmor(admin.ModelAdmin):
    list_display = ['name','armor_value']