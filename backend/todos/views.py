from rest_framework import viewsets, generics, permissions, viewsets, response
from . import models
from users import models as user_model
from .serializers import TaskSerializer, ContainerSerializer, ProjectSerializer

# Authenticated View

class ProjectViewSet(viewsets.ModelViewSet):

    queryset = models.Project.objects.all().order_by('updated')
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ContainerViewSet(viewsets.ModelViewSet):

    queryset = models.Container.objects.all().order_by('order')
    serializer_class = ContainerSerializer
    permission_classes = (permissions.IsAuthenticated,)


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


