from django.db import models

BOOK_CATEGORIES = [
    ("Fiction", "Fiction"),
    ("Science", "Science"),
    ("Technology", "Technology"),
    ("History", "History"),
    ("Biography", "Biography"),
]


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=150)
    isbn = models.CharField(max_length=20, unique=True)

    category = models.CharField(
        max_length=50,
        choices=BOOK_CATEGORIES
    )

    quantity = models.PositiveIntegerField(default=1)
    available_quantity = models.PositiveIntegerField(default=1)

    shelf_location = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return f"{self.title} ({self.isbn})"