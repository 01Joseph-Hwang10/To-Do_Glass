from rest_framework.serializers import HyperlinkedModelSerializer, HyperlinkedRelatedField
from rest_framework.serializers import ReadOnlyField, ImageField, JSONField
from . import models as todo_model
from users import models as user_model


class ProjectSerializer(HyperlinkedModelSerializer):
    created_user = ReadOnlyField(source="created_user.id")
    count_containers = JSONField()
    get_containers = JSONField()
    class Meta:
        model = todo_model.Project
        fields = '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'todos:project-detail',
            },
        }



class ContainerSerializer(HyperlinkedModelSerializer):
    project = ReadOnlyField(source='project.id')
    count_tasks = JSONField()
    get_tasks = JSONField()

    class Meta:
        model = todo_model.Container
        fields = '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'todos:container-detail',
            },
        }



class TaskSerializer(HyperlinkedModelSerializer):
    container = ReadOnlyField(source='container.id')

    class Meta:
        model = todo_model.Task
        fields = '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'todos:task-detail',
            },
        }

