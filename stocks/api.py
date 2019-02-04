from rest_framework import viewsets, permissions

from .serializer import StockSerializer
from stocks.models import Stock

# Stock Viewset
class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StockSerializer
