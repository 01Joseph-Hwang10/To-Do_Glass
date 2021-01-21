from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework import serializers
from . import models

class UserSerializer(HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="users:user-detail")
    avatar = serializers.ImageField(use_url=True,required=False)
    following = serializers.PrimaryKeyRelatedField(many=True, read_only=False,queryset=models.User.objects.all(),required=False)
    followers = serializers.PrimaryKeyRelatedField(many=True, read_only=False,queryset=models.User.objects.all(),required=False)
    following_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()

    class Meta:
        model = models.User
        fields = '__all__'
        extra_kwargs = {
            'url': {
                'view_name': 'users:user-detail',
            },
        }

    def get_validation_exclusions(self):
        exclusions = super(UserSerializer, self).get_validation_exclusions()
        return exclusions + [
            'avatar',
            'following',
            'followers',
        ]
