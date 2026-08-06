import csv

from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from books.models import Book
from borrowings.models import Borrowing



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def export_books_csv(request):

    response = HttpResponse(content_type="text/csv")

    response["Content-Disposition"] = (
        'attachment; filename="books.csv"'
    )

    writer = csv.writer(response)

    writer.writerow([
        "Title",
        "Author",
        "ISBN",
        "Category",
        "Quantity",
        "Available Quantity",
        "Shelf",
    ])

    books = Book.objects.all()

    for book in books:

        writer.writerow([
            book.title,
            book.author,
            book.isbn,
            book.category,
            book.quantity,
            book.available_quantity,
            book.shelf_location,
        ])

    return response
  
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def export_borrowings_csv(request):

    response = HttpResponse(content_type="text/csv")

    response["Content-Disposition"] = (
        'attachment; filename="borrowings.csv"'
    )

    writer = csv.writer(response)

    writer.writerow([
        "Member",
        "Book",
        "Issue Date",
        "Due Date",
        "Return Date",
        "Fine",
        "Status",
    ])

    borrowings = Borrowing.objects.all()

    for b in borrowings:

        writer.writerow([
            b.member.name,
            b.book.title,
            b.issue_date,
            b.due_date,
            b.return_date,
            b.fine,
            b.status,
        ])

    return response