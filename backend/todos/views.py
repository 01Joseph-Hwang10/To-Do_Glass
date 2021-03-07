from django.db.models import Q
from django.forms.models import model_to_dict
from rest_framework import viewsets, generics, viewsets, response, status
from . import models
from users import models as user_model
from users.mixins import get_cookie
from .serializers import TaskSerializer, ContainerSerializer, ProjectSerializer, TagSerializer
from . import permissions as todo_permission

# Authenticated View


class ProjectViewSet(viewsets.ModelViewSet):

    queryset = models.Project.objects.all().order_by('-updated').order_by('importance')
    serializer_class = ProjectSerializer
    permission_classes = (todo_permission.ProjectAllowedToWrite,)
    
    def create(self, request, *args, **kwargs):
        post_data = request.data
        user=user_model.User.objects.get(id=post_data['user_id'])
        new_object=models.Project.objects.create(
            created_user=user,
            name=post_data['name'],
            order=post_data['order'],
            importance=False,
            description="",
            isPrivate=False
        )
        serializer = self.get_serializer(new_object)
        return response.Response(data=serializer.data,status=status.HTTP_201_CREATED)

class TagViewSet(viewsets.ModelViewSet):

    queryset = models.Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (todo_permission.TagAllowedToWrite,)

    def create(self, request, *args, **kwargs):
        post_data = request.data
        tag_for = models.Project.objects.get(id=post_data['tag_for_id'])
        new_object=models.Tag.objects.create(
            name=post_data['name'],
            tag_for=tag_for,
        )
        return response.Response(data=model_to_dict(new_object),status=status.HTTP_201_CREATED)


QUERY_COUNT = 5

class SortedProjectView(generics.RetrieveUpdateAPIView):

    queryset = models.Project.objects.all()
    serializer_class = ProjectSerializer

    def retrieve(self, request, *args, **kwargs):
        cookie=get_cookie(request)
        user_id=int(cookie['user_id'])
        user=user_model.User.objects.get(id=user_id)
        instance = models.Project.objects.filter(~Q(created_user=user) & Q(isPrivate=False)).order_by('-updated')[:QUERY_COUNT]
        response_data = []
        for i in instance:
            serializer = self.get_serializer(i)
            response_data.append(serializer.data)
        return response.Response(data=response_data,status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        input_value = request.data['input']
        user_id = request.data['user_id']
        searched_id = request.data['searchedId']
        user=user_model.User.objects.get(id=user_id)
        response_data = []
        if input_value:
            for word in input_value.split():
                tags_iexact = models.Tag.objects.filter(name__iexact=word)
                instance_iexact = models.Project.objects.filter(
                    (Q(name__iexact=word) | Q(description__iexact=word) |
                    Q(tags__in=tags_iexact) | Q(created_user__first_name__iexact=word)) &
                    Q(isPrivate=False) & ~Q(created_user__id__iexact=user_id) & 
                    ~Q(created_user=user) & ~Q(id__in=searched_id)
                    )[:QUERY_COUNT]
                for i in instance_iexact:
                    serializer = self.get_serializer(i)
                    response_data.append(serializer.data)
            if not response_data:
                for word in input_value:
                    tags_icontains = models.Tag.objects.filter(name__icontains=word)
                    instance_icontains = models.Project.objects.filter(
                        (Q(name__icontains=word) | Q(description__icontains=word) |
                        Q(tags__in=tags_icontains) | Q(created_user__first_name__icontains=word)) &
                        Q(isPrivate=False) & ~Q(created_user__id__iexact=user_id) & 
                        ~Q(created_user=user) & ~Q(id__in=searched_id)
                        )[:QUERY_COUNT]
                    for i in instance_icontains:
                        serializer = self.get_serializer(i)
                        response_data.append(serializer.data)
        else:
            instance = models.Project.objects.filter(~Q(created_user=user) & Q(isPrivate=False) & ~Q(id__in=searched_id)).order_by('-updated')[:QUERY_COUNT]
            for i in instance:
                serializer = self.get_serializer(i)
                response_data.append(serializer.data)
        cleaned_data = list({v['id']:v for v in response_data}.values())
        return response.Response(data=cleaned_data,status=status.HTTP_200_OK)


class ContainerViewSet(viewsets.ModelViewSet):

    queryset = models.Container.objects.all().order_by('order')
    serializer_class = ContainerSerializer
    permission_classes = (todo_permission.ContainerAllowedToWrite,)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     print(serializer)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def create(self, request, *args, **kwargs):
        post_data = request.data
        description = ""
        try:
            description = post_data['description']
        except Exception:
            pass
        new_object=models.Container.objects.create(
            project=models.Project.objects.get(id=post_data['project_id']),
            name=post_data['name'],
            order=post_data['order'],
            completed=False,
            importance=False,
            description=description
        )
        serializer=self.get_serializer(new_object)
        return response.Response(data=serializer.data,status=status.HTTP_201_CREATED)



class TaskViewSet(viewsets.ModelViewSet):

    queryset = models.Task.objects.all().order_by('order')
    serializer_class = TaskSerializer
    permission_classes = (todo_permission.TaskAllowedToWrite,)

    def create(self, request, *args, **kwargs):
        post_data = request.data
        new_object=models.Task.objects.create(
            container=models.Container.objects.get(id=post_data['container_id']),
            name=post_data['name'],
            order=post_data['order'],
            completed=False,
            importance=False,
            description=""
        )
        serializer=self.get_serializer(new_object)
        return response.Response(data=serializer.data,status=status.HTTP_201_CREATED)


# Public View

class PublicProjectViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Project.objects.filter(Q(isPrivate=False)).order_by('-updated').order_by('importance')
    serializer_class = ProjectSerializer


class PublicTagViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Tag.objects.filter(Q(tag_for__isPrivate=False))
    serializer_class = TagSerializer


class PublicContainerViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Container.objects.filter(Q(project__isPrivate=False))
    serializer_class = ContainerSerializer


class PublicTaskViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Task.objects.filter(Q(container__project__isPrivate=False))
    serializer_class = TaskSerializer


