from rest_framework import serializers
from .models import Borrowing
from datetime import date


class BorrowingSerializer(serializers.ModelSerializer):

    book_title = serializers.CharField(source="book.title", read_only=True)
    member_name = serializers.CharField(source="member.name", read_only=True)

    class Meta:
        model = Borrowing
        fields = "__all__"

    def create(self, validated_data):

        book = validated_data["book"]

        if book.available_quantity <= 0:
            raise serializers.ValidationError(
                "Book is currently unavailable."
            )

        book.available_quantity -= 1
        book.save()

        return Borrowing.objects.create(**validated_data)

    def update(self, instance, validated_data):

        if validated_data.get("status") == "RETURNED":

            if instance.status != "RETURNED":

                book = instance.book
                book.available_quantity += 1
                book.save()

                if instance.due_date < date.today():

                    instance.fine = (
                        (date.today() - instance.due_date).days * 10
                    )

        return super().update(instance, validated_data)