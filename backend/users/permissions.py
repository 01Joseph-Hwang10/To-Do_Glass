from rest_framework import permissions
from .mixins import get_cookie
from . import models as user_model


class IsAllowedToWrite(permissions.IsAuthenticated):
    
    def has_permission(self, request, view):
        isAuthenticated = bool(
            request.user and
            request.user.is_authenticated
            )
        return isAuthenticated

    def has_object_permission(self, request, view, obj):
        cookie=get_cookie(request)
        isAuthenticated = bool(
            request.user == obj and
            int(cookie['user_id']) == int(request.data['user_id']) and
            int(cookie['user_id']) == int(obj.id)
        )
        return isAuthenticated