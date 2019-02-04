from django.db import models

# Create your models here.

class Stock(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    price = models.FloatField()
    price_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)