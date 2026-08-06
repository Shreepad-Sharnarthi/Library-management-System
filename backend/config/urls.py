from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import CustomTokenObtainPairView

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/", include("accounts.urls")),
    path("api/", include("books.urls")),
    path("api/", include("members.urls")),
    path("api/", include("borrowings.urls")),
    path("api/", include("dashboard.urls")),
    path("api/", include("reports.urls")),

    path(
        "api/login/",
        CustomTokenObtainPairView.as_view(),   # <-- MUST be this
        name="token_obtain_pair",
    ),

    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
]