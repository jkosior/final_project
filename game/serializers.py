from rest_framework import serializers
from game.models import Being, Weapon, Armor, Player


class BeingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Being
        fields = ['name', 'health','experience','weapon','armor']
        
class WeaponSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Weapon
        fields = ['name','min_att_value','max_att_value']
        
class ArmorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Armor
        fields = ['name', 'armor_value']

class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Player
        fields = ['user','avatar', 'score']
