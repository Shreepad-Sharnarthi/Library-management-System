from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer
from accounts.permissions import IsAdminOrLibrarianReadWrite
from rest_framework import filters

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrLibrarianReadWrite]

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = [
        "title",
        "author",
        "isbn",
        "category",
    ]

    ordering_fields = [
        "title",
        "created_at",
        "quantity",
    ]