# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-19 15:00
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0004_being_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='best_score',
        ),
    ]