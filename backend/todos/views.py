import datetime, json
from django.db.models import Q
from django.forms.models import model_to_dict
from rest_framework import viewsets, generics, permissions, viewsets, response, status
from . import models
from users import models as user_model
from users.mixins import get_cookie
from .serializers import TaskSerializer, ContainerSerializer, ProjectSerializer
from . import permissions as todo_permission

# Authenticated View


class ProjectViewSet(viewsets.ModelViewSet):

    queryset = models.Project.objects.all().order_by('updated')
    serializer_class = ProjectSerializer
    permission_classes = (todo_permission.ProjectAllowedToWrite,)


class SortedProjectView(generics.RetrieveAPIView):

    queryset = models.Project.objects.all().order_by('updated')
    serializer_class = ProjectSerializer

    def retrieve(self, request, *args, **kwargs):
        cookie=get_cookie(request)
        user_id=int(cookie['user_id'])
        user=user_model.User.objects.get(id=user_id)
        instance = models.Project.objects.filter(~Q(created_user=user))[:5]
        response_data = []
        for i in instance:
            serializer = self.get_serializer(i)
            response_data.append(serializer.data)
        return response.Response(data=response_data,status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class ContainerViewSet(viewsets.ModelViewSet):

    queryset = models.Container.objects.all().order_by('order')
    serializer_class = ContainerSerializer
    # permission_classes = (todo_permission.ContainerAllowedToWrite,)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     print(serializer)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def create(self, request, *args, **kwargs):
        post_data = request.data
        new_object=models.Container.objects.create(
            project=models.Project.objects.get(id=post_data['project_id']),
            name=post_data['name'],
            order=post_data['order'],
            completed=False,
            importance=False,
            description=""
        )
        return response.Response(data=model_to_dict(new_object),status=status.HTTP_201_CREATED)



class TaskViewSet(viewsets.ModelViewSet):

    queryset = models.Task.objects.all().order_by('order')
    serializer_class = TaskSerializer
    permission_classes = (todo_permission.TaskAllowedToWrite,)


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


