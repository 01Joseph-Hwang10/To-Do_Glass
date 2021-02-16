from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import HyperlinkedIdentityField
from rest_framework.serializers import ReadOnlyField, ListField, IntegerField
from . import models as todo_model
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
    participant_ids = ReadOnlyField(required=False)

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
            'participants',
            'participant_ids',
        ]


class TagSerializer(HyperlinkedModelSerializer):

    tag_for = IntegerField(source='project.id')

    class Meta:
        model = todo_model.Tag
        fields= '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'todos:tag-detail',
            },
        }



class ContainerSerializer(HyperlinkedModelSerializer):
    
    project = IntegerField(source='project.id')
    id=ReadOnlyField()
    count_tasks = ReadOnlyField(required=False)
    get_tasks = ReadOnlyField(required=False)

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
            'count_tasks',
            'created',
            'updated',
        ]



class TaskSerializer(HyperlinkedModelSerializer):
    container = IntegerField(source='container.id')
    id=ReadOnlyField()

    class Meta:
        model = todo_model.Task
        fields = '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'todos:task-detail',
            },
        }

