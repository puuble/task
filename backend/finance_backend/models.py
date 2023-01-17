from django.db import models


# Create your models here.

class Symbol(models.Model):
    
    pair = models.CharField(max_length=20)
    marketSymbol = models.CharField(max_length=20)
    entryPrice = models.FloatField(default=None)
    position = models.CharField(default=None, max_length=10)

    def __str__(self):
        return self.pair


class InsertId(models.Model):
    ObjectId = models.CharField(max_length=100)

    def __str__(self):
        return self.ObjectId

class Position(models.Model):
    pair = models.CharField(max_length=20)
    entryPrice = models.FloatField(default=None)
    exitPrice = models.FloatField(default=None)
    qty = models.FloatField(default=1)
    position = models.CharField(default=None, max_length=10)
    pnlusdt = models.FloatField(default=None)
    pnlpercent = models.FloatField(default=None)
    profit = models.BooleanField(default=None)
    
    def __str__(self):
        return self.pair
