from django.contrib import admin
from . import models


@admin.register(models.Task)
class TaskAdmin(admin.ModelAdmin):

    list_display = (
        "container",
        "name",
        "order",
        "importance",
        "description",
    )


@admin.register(models.Container)
class ContainerAdmin(admin.ModelAdmin):

    list_display = (
        "project",
        "name",
        "order",
        "importance",
        "description",
        "count_tasks",
    )


@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = (
        "created_user",
        "name",
        "order",
        "importance",
        "description",
        "count_containers",
    )