from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
        
        
    def validate(self, data):
        quantity = data.get("quantity")
        available_quantity = data.get("available_quantity")

        if available_quantity > quantity:
            raise serializers.ValidationError(
                {
                    "available_quantity":
                    "Available quantity cannot exceed total quantity."
                }
            )

        return data
        