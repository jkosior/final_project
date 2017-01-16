from django.db import models

# Create your models here.

class Being(models.Model):
    name = models.CharField(max_length = 64, unique = True)
    health = models.IntegerField()
    mana = models.IntegerField()
    weapon = models.ForeignKey('Weapon', null = True, blank = True)
    armor = models.ForeignKey("Armor", null = True, blank = True)
    image = models.ImageField(upload_to = 'static', null = True, blank = True)
    
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
    
class Wall(models.Model):
    image = models.ImageField(upload_to = 'static', null = True, blank = True)