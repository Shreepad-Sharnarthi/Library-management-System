from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == "ADMIN"
        )


class IsLibrarian(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == "LIBRARIAN"
        )


class IsAdminOrLibrarianReadWrite(BasePermission):
    """
    Both ADMIN and LIBRARIAN can authenticate and use the app day-to-day
    (list/create/update). Deleting records is restricted to ADMIN only.
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        if getattr(view, "action", None) == "destroy":
            return request.user.role == "ADMIN"

        return request.user.role in ("ADMIN", "LIBRARIAN")