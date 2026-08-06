from django.db import models
from django.utils import timezone
from books.models import Book
from members.models import Member


class Borrowing(models.Model):

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)

    issue_date = models.DateField(default=timezone.now)

    due_date = models.DateField()

    return_date = models.DateField(null=True, blank=True)

    fine = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    STATUS_CHOICES = [
        ("ISSUED", "Issued"),
        ("RETURNED", "Returned"),
        ("OVERDUE", "Overdue"),
    ]

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="ISSUED",
    )

    def save(self, *args, **kwargs):

        today = timezone.now().date()

        if self.return_date:
            self.status = "RETURNED"

        elif self.due_date < today:
            self.status = "OVERDUE"

            days = (today - self.due_date).days

            self.fine = days * 10

        else:
            self.status = "ISSUED"

            self.fine = 0

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.member.name} - {self.book.title}"