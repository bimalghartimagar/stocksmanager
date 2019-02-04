from rest_framework import serializers

from stocks.models import Stock

# Stock Serializer
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'