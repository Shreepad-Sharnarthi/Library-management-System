from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["username", "email", "password", "full_name", "role"]
        extra_kwargs = {
            "role": {"required": False},
        }

    def create(self, validated_data):
        full_name = validated_data.pop("full_name", "")
        password = validated_data.pop("password")

        # Only allow LIBRARIAN to self-register; ADMIN accounts should be
        # created deliberately (e.g. via Django admin), not through the
        # public registration form.
        validated_data["role"] = "LIBRARIAN"
        validated_data["first_name"] = full_name

        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
