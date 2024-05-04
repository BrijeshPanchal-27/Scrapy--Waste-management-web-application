from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    subject = models.CharField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return self.name


class ApplyNow(models.Model):
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    department = models.CharField(max_length=50)
    link = models.CharField(max_length=200)
    message = models.TextField(default='')

    def __str__(self):
        return self.fname + self.lname

class Order(models.Model):
    oid = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    collection_type = models.CharField(max_length=100)
    price = models.FloatField()
    address = models.TextField(max_length=255)
    pickup_address = models.TextField(max_length=255)
    drop_address = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    pickup_at = models.DateTimeField()

    def __str__(self) -> str:
        return f"{self.user} - {self.oid}"


class Collectors(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Name = models.CharField(max_length=100, blank=False)
    Info = models.CharField(max_length=50, blank=False)
    Min_order = models.CharField(max_length=5, blank=False)
    Location = models.CharField(max_length=40, blank=False)
    Photo = models.ImageField(blank=False)
    status = models.CharField(max_length=20, default='Available')

    def __str__(self):
        return self.Name
