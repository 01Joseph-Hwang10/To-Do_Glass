from rest_framework import permissions
from users.mixins import get_cookie
from users import models as user_model


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
            cookie['user_id'] == request.data['user_id'] and
            cookie['user_id'] == obj.id
        )
        return isAuthenticated