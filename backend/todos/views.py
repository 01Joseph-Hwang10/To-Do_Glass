from rest_framework import viewsets, generics, permissions, viewsets, response
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


class SortedProjectViewSet(generics.RetrieveAPIView):

    queryset = models.Project.objects.all().order_by('updated')
    serializer_class = ProjectSerializer
    permission_classes = (IsAllowedToWrite,)

    def retrieve(self, request, *args, **kwargs):
        cookie=get_cookie(request)
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data)

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


