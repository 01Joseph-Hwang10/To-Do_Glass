from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models
from rest_framework.authtoken.models import Token

class User(AbstractUser):

    bio = models.TextField(max_length=200,blank=True,null=True)
    avatar = models.ImageField(blank=True, null=True, upload_to="avatars/",default='avatars/person-icon.png')
    following = models.ManyToManyField("users.User", blank=True,related_name="users")

    class Meta:
        abstract = False


    def following_count(self):
        return self.following.count()

    def followers(self):
        return self.users.all()

    def followers_count(self):
        return self.users.count()

    def get_my_projects(self):
        return self.project_created_user.all().values()

