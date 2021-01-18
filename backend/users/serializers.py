from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework import serializers
from . import models

class UserSerializer(HyperlinkedModelSerializer):
    avatar = serializers.ImageField(use_url=True)
    following = serializers.PrimaryKeyRelatedField(many=True, read_only=False,queryset=models.User.objects.all())
    followers = serializers.PrimaryKeyRelatedField(many=True, read_only=False,queryset=models.User.objects.all())

    class Meta:
        model = models.User
        fields = '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'users:user-detail',
            },
        }