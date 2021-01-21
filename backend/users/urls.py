from django.urls import include, path
from rest_framework import routers
# from rest_framework.authtoken import views
from . import views as user_view

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
router = routers.DefaultRouter()
router.register(r'users', user_view.UserViewSet,'user')
router.register(r'public_users', user_view.PublicUserViewSet,'public_user')

app_name = "users"

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', user_view.CustomAuthToken.as_view(),name="api_token_auth"),
    path('sign-up/',user_view.SignUpView.as_view(),name="sign_up"),
]