from django.urls import path
from . import views


app_name = "auths"

urlpatterns = [
    path('password_reset/', views.CustomPasswordResetView.as_view(), name="password_reset"),
    path('password_reset_done/', views.CustomPasswordResetDoneView.as_view(), name="password_reset_done"),
    path('password_reset_confirm/<uidb64>/<token>/', views.CustomPasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path('password_reset_complete/', views.CustomPasswordResetCompleteView.as_view(), name="password_reset_complete"),
]
