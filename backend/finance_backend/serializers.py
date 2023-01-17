from rest_framework import serializers
from .models import Symbol, InsertId, Position

class SymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symbol
        fields = '__all__'

class InsertIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsertId
        fields = '__all__'

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'