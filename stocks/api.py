from rest_framework import viewsets, permissions

from .serializer import StockSerializer
from stocks.models import Stock

# Stock Viewset


class StockViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = StockSerializer

    def get_queryset(self):
        return self.request.user.stocks.all().order_by('-price_date')

    def perform_create(self, serializer):
        print(isinstance(self.request.data, list))
        serializer.save(owner=self.request.user)
