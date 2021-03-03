from django.urls import path
from django.urls.conf import include
from . import views

app_name = "core"

urlpatterns = [
    path('',views.APILandingView.as_view(),name='')
]
