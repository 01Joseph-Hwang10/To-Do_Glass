from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from rest_framework.serializers import PrimaryKeyRelatedField, HyperlinkedIdentityField, HyperlinkedRelatedField
from rest_framework.serializers import ReadOnlyField, ImageField, ListField
from . import models as todo_model
from users import models as user_model
from users import serializers as user_serializer


class ProjectSerializer(HyperlinkedModelSerializer):

    url = HyperlinkedIdentityField(view_name='todos:project-detail')
    id=ReadOnlyField()
    created_user = user_serializer.LightUserSerializer()
    count_containers = ReadOnlyField(required=False)
    get_containers = ListField(required=False)
    get_container_ids = ListField(required=False)
    get_tags = ListField(required=False)
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
            'get_container_ids',
            'contributor',
            'get_tags',
        ]


class TagSerializer(HyperlinkedModelSerializer):

    tag_for = ProjectSerializer()

    class Meta:
        model = todo_model.Tag
        fields= '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'todos:tag-detail',
            },
        }



class ContainerSerializer(HyperlinkedModelSerializer):
    project = ReadOnlyField(source='project.id')
    id=ReadOnlyField()
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
        exclusions = super(ContainerSerializer, self).get_validation_exclusions()
        return exclusions + [
            'get_tasks',
        ]



class TaskSerializer(HyperlinkedModelSerializer):
    container = ReadOnlyField(source='container.id')
    id=ReadOnlyField()

    class Meta:
        model = todo_model.Task
        fields = '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'todos:task-detail',
            },
        }

