# Generated by Django 5.1.7 on 2025-03-12 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_faq'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='', max_length=30, unique=True),
            preserve_default=False,
        ),
    ]
