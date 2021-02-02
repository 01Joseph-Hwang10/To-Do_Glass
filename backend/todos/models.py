from django.db import models
from core import models as core_model
from django.core.validators import MinValueValidator, MaxValueValidator


class Task(core_model.TimeStampedModel):

    container = models.ForeignKey("todos.Container", on_delete=models.CASCADE, related_name="tasks")    
    name = models.CharField(max_length=50)
    order = models.IntegerField(validators=[MinValueValidator(1),])
    completed = models.BooleanField(default=False)
    importance = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Container(core_model.TimeStampedModel):

    project = models.ForeignKey("todos.Project", on_delete=models.CASCADE, related_name="containers")
    name = models.CharField(max_length=50)
    order = models.IntegerField(validators=[MinValueValidator(1),])
    completed = models.BooleanField(default=False)
    importance = models.BooleanField(default=False)
    description = models.TextField(blank=True,null=True)

    def count_tasks(self):
        return int(len(self.tasks.all()))

    def get_tasks(self):
        return self.tasks.all().values()

    def __str__(self):
        return self.name
    

class Project(core_model.TimeStampedModel):

    created_user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="project_created_user")
    name = models.CharField(max_length=50)
    order = models.IntegerField(validators=[MinValueValidator(1),])
    importance = models.BooleanField(default=False)
    description = models.TextField(blank=True,null=True)
    participants = models.ManyToManyField("users.User", blank=True,related_name="project_contributor")

    def count_containers(self):
        return int(len(self.containers.all()))

    def get_containers(self):
        return self.containers.all().values()

    def get_container_ids(self):
        return self.containers.all().values_list('id',flat=True).order_by('order')

    def get_tags(self):
        return self.tags.all().values()

    def participant_ids(self):
        return self.participants.all().values_list('id',flat=True)

    def __str__(self):
        return self.name


class Tag(core_model.TimeStampedModel):

    name=models.CharField(max_length=50)
    tag_for = models.ForeignKey("todos.Project", on_delete=models.CASCADE, related_name="tags")

