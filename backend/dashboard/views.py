from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from books.models import Book
from members.models import Member
from borrowings.models import Borrowing


class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        data = {
            "total_books": Book.objects.count(),

            "books_issued": Borrowing.objects.filter(
                status="ISSUED"
            ).count(),

            "overdue_books": Borrowing.objects.filter(
                status="OVERDUE"
            ).count(),

            "active_members": Member.objects.filter(
                status="ACTIVE"
            ).count(),
        }

        return Response(data)