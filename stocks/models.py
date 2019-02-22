from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Stock(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    price = models.FloatField()
    price_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="stocks", on_delete=models.CASCADE, null=True)

    class Meta:
        unique_together = ('symbol', 'price_date')
