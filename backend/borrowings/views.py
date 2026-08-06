from rest_framework import viewsets
from accounts.permissions import IsAdminOrLibrarianReadWrite
from .models import Borrowing
from .serializers import BorrowingSerializer


class BorrowingViewSet(viewsets.ModelViewSet):
    queryset = Borrowing.objects.all()
    serializer_class = BorrowingSerializer
    permission_classes = [IsAdminOrLibrarianReadWrite]