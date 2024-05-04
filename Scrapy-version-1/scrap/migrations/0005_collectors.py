# Generated by Django 4.2 on 2023-05-19 07:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("scrap", "0004_order"),
    ]

    operations = [
        migrations.CreateModel(
            name="Collectors",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("Name", models.CharField(max_length=100)),
                ("Info", models.CharField(max_length=50)),
                ("Min_order", models.CharField(max_length=5)),
                ("Location", models.CharField(max_length=40)),
                ("Photo", models.ImageField(upload_to="")),
                ("status", models.CharField(default="Available", max_length=20)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        )
    ]
