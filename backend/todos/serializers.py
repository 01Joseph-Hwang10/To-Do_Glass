from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from rest_framework.serializers import PrimaryKeyRelatedField, HyperlinkedIdentityField, HyperlinkedRelatedField
from rest_framework.serializers import ReadOnlyField, ImageField, ListField
from . import models as todo_model
from users import models as user_model
from users import serializers as user_serializer


class ProjectSerializer(HyperlinkedModelSerializer):

    url = HyperlinkedIdentityField(view_name='todos:project-detail')
    created_user = user_serializer.LightUserSerializer(required=False)
    count_containers = ReadOnlyField(required=False)
    get_containers = ListField(required=False)
    participants = user_serializer.LightUserSerializer(many=True,read_only=False,required=False)

    class Meta:
        model = todo_model.Project
        fields = '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'todos:project-detail',
            },
        }
    
    def get_validation_exclusions(self):
        exclusions = super(ProjectSerializer, self).get_validation_exclusions()
        return exclusions + [
            'created_user',
            'get_containers',
            'contributor',
        ]



class ContainerSerializer(HyperlinkedModelSerializer):
    project = ReadOnlyField(source='project.id')
    count_tasks = ReadOnlyField()
    get_tasks = ListField()

    class Meta:
        model = todo_model.Container
        fields = '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'todos:container-detail',
            },
        }

    def get_validation_exclusions(self):
        exclusions = super(ProjectSerializer, self).get_validation_exclusions()
        return exclusions + [
            'get_tasks',
        ]



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

