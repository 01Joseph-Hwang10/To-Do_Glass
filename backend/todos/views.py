from django.db.models import Q
from rest_framework import viewsets, generics, permissions, viewsets, response, status
from . import models
from users import models as user_model
from users.mixins import get_cookie
from .serializers import TaskSerializer, ContainerSerializer, ProjectSerializer
from .permissions import IsAllowedToWrite

# Authenticated View

class ProjectViewSet(viewsets.ModelViewSet):

    queryset = models.Project.objects.all().order_by('updated')
    serializer_class = ProjectSerializer
    permission_classes = (IsAllowedToWrite,)


class SortedProjectView(generics.RetrieveAPIView):

    queryset = models.Project.objects.all().order_by('updated')
    serializer_class = ProjectSerializer

    def retrieve(self, request, *args, **kwargs):
        cookie=get_cookie(request)
        user_id=int(cookie['user_id'])
        user=user_model.User.objects.get(id=user_id)
        instance = models.Project.objects.filter(~Q(created_user=user))[:5]
        response_data = list(instance.values())
        return response.Response(data=response_data,status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class ContainerViewSet(viewsets.ModelViewSet):

    queryset = models.Container.objects.all().order_by('order')
    serializer_class = ContainerSerializer
    permission_classes = (IsAllowedToWrite,)


class TaskViewSet(viewsets.ModelViewSet):

    queryset = models.Task.objects.all().order_by('order')
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)


# Public View

class PublicProjectViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Project.objects.all().order_by('updated')
    serializer_class = ProjectSerializer


class PublicContainerViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Container.objects.all()
    serializer_class = ContainerSerializer


class PublicTaskViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Task.objects.all()
    serializer_class = TaskSerializer


