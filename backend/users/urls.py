from django.urls import include, path
from rest_framework import routers
# from rest_framework.authtoken import views
from . import views as user_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
router = routers.DefaultRouter()
router.register(r'users', user_view.UserViewSet,'user')
router.register(r'public_users', user_view.PublicUserViewSet,'public_user')

app_name = "users"

urlpatterns = [
    path('', include(router.urls)),
    # path('api-token-auth/', user_view.CustomAuthToken.as_view(),name="api_token_auth"),
    path('sign-up/',user_view.SignUpView.as_view(),name="sign_up"),
    path('check-self-auth/',user_view.CheckSelfAuthView.as_view(),name="check_auth"),
    path('logout/',user_view.LogoutView.as_view(),name="logout"),
    path('token/', user_view.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', user_view.CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),  
]