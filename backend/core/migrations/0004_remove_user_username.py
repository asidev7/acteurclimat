# Generated by Django 5.1.7 on 2025-03-12 23:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
    ]
