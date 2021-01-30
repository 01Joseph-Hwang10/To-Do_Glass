from rest_framework import permissions
from users.mixins import get_cookie
from users import models as user_model


class ProjectAllowedToWrite(permissions.IsAuthenticated):
    
    def has_permission(self, request, view):
        isAuthenticated = bool(
            request.user and
            request.user.is_authenticated
            )
        return isAuthenticated

    def has_object_permission(self, request, view, obj):
        cookie=get_cookie(request)
        user_id = int(cookie['user_id'])
        isAuthenticated = bool(
            user_id == int(request.data['user_id']) and
            user_id == int(obj.created_user.id)
        )
        return isAuthenticated

class ContainerAllowedToWrite(permissions.IsAuthenticated):
    
    def has_permission(self, request, view):
        isAuthenticated = bool(
            request.user and
            request.user.is_authenticated
            )
        return isAuthenticated

    def has_object_permission(self, request, view, obj):
        cookie=get_cookie(request)
        user_id = int(cookie['user_id'])
        isAuthenticated = bool(
            user_id == int(request.data['user_id']) and
            user_id == int(obj.project.created_user.id)
        )
        return isAuthenticated

class TaskAllowedToWrite(permissions.IsAuthenticated):
    
    def has_permission(self, request, view):
        isAuthenticated = bool(
            request.user and
            request.user.is_authenticated
            )
        return isAuthenticated

    def has_object_permission(self, request, view, obj):
        cookie=get_cookie(request)
        user_id = int(cookie['user_id'])
        isAuthenticated = bool(
            user_id == int(request.data['user_id']) and
            user_id == int(obj.container.project.created_user.id)
        )
        return isAuthenticated