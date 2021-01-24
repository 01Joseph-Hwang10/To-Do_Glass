from rest_framework import permissions
from .mixins import get_cookie
from . import models as user_model


class IsAllowedToWrite(permissions.IsAuthenticated):
    
    def has_permission(self, request, view):
        # cookie=get_cookie(request)
        # try:
        # access_token=cookie['access_token']
        # user_id=cookie['user_id']
        # print(request.user)
        # request.headers['Authorization'] = f'Bearer {access_token}'
        isAuthenticated = bool(
            request.user and
            request.user.is_authenticated
            )
        return isAuthenticated
        # except:
        #     return False

    def has_object_permission(self, request, view, obj):
        cookie=get_cookie(request)
        isAuthenticated = bool(
            request.user == obj and
            cookie['user_id'] == request.data['user_id'] and
            cookie['user_id'] == obj.id
        )
        return isAuthenticated