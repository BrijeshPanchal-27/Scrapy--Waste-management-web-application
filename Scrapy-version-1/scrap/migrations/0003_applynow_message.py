# Generated by Django 4.2 on 2023-04-28 03:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scrap', '0002_applynow'),
    ]

    operations = [
        migrations.AddField(
            model_name='applynow',
            name='message',
            field=models.TextField(default=''),
        ),
    ]
