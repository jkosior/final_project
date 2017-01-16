from rest_framework import serializers
from game.models import Being

class BeingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Being
        fields = '__all__'
    