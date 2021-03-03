from django.db.models import Q
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    bio = models.TextField(max_length=1000,blank=True,null=True)
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

    def get_public_projects(self):
        return self.project_created_user.filter(Q(isPrivate=False)).values()

    def projects_count(self):
        return self.project_created_user.count()

    def containers_count(self):
        return self.project_created_user.containers.count()
    
    def tasks_count(self):
        return self.project_created_user.containers.tasks.count()

    def tags_count(self):
        return self.project_created_user.tags.count()

