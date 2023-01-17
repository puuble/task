from django.db import models

# Create your models here.


class db2(models.Model):
    pair = models.CharField(max_length=10)
    marketSymbol = models.CharField(max_length=10)
    position = models.CharField(max_length=10)

    def __str__(self):
        return self.pair
