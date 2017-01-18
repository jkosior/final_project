from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Being(models.Model):
    name = models.CharField(max_length = 64, unique = True)
    health = models.IntegerField()
    experience = models.IntegerField(null = True)
    weapon = models.ForeignKey('Weapon', null = True, blank = True)
    armor = models.ForeignKey("Armor", null = True, blank = True)
    is_playable = models.BooleanField(default = True)
    
    def __str__(self):
        return self.name

class Weapon(models.Model):
    name = models.CharField(max_length = 32)
    min_att_value = models.IntegerField()
    max_att_value = models.IntegerField()
    
    def __str__(self):
        return self.name
    
class Armor(models.Model):
    name = models.CharField(max_length = 32)
    armor_value = models.IntegerField()
    
    def __str__(self):
        return self.name
        
class Player(models.Model):
    user = models.ForeignKey(User)
    avatar = models.ForeignKey('Being', limit_choices_to={"is_playable":True})
    score = models.ForeignKey('Score', null = True)
    best_score = models.IntegerField(null = True)
    
    def __str__(self):
        return self.user
    
class Score(models.Model):
    score = models.IntegerField(null = True)
    
