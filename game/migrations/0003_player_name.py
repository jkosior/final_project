# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-19 10:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0002_auto_20170119_1019'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='name',
            field=models.CharField(max_length=32, null=True),
        ),
    ]
