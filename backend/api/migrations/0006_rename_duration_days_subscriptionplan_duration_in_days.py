# Generated by Django 5.1.7 on 2025-03-16 11:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_delete_country_delete_livescore_remove_player_team_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subscriptionplan',
            old_name='duration_days',
            new_name='duration_in_days',
        ),
    ]
