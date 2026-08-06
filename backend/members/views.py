from rest_framework import viewsets, filters
from accounts.permissions import IsAdminOrLibrarianReadWrite
from .models import Member
from .serializers import MemberSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAdminOrLibrarianReadWrite]

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = [
        "name",
        "email",
        "phone",
    ]

    ordering_fields = [
        "name",
        "membership_date",
    ]