from django.urls import path
from .views import (
    export_books_csv,
    export_borrowings_csv,
)

urlpatterns = [

    path(
        "reports/books/",
        export_books_csv,
    ),

    path(
        "reports/borrowings/",
        export_borrowings_csv,
    ),

]