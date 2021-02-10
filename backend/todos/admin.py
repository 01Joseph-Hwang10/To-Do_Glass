from django.contrib import admin
from . import models


@admin.register(models.Task)
class TaskAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "container",
        "importance",
        "description",
        "order",
    )

class TaskInline(admin.TabularInline):

    model = models.Task


@admin.register(models.Container)
class ContainerAdmin(admin.ModelAdmin):

    inlines = (TaskInline,)

    list_display = (
        "name",
        "project",
        "importance",
        "description",
        "count_tasks",
        "order",
    )

class ContainerInline(admin.TabularInline):

    model = models.Container


@admin.register(models.Tag)
class TagAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "tag_for",
    )

class TagInline(admin.TabularInline):

    model = models.Tag


@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):

    inlines = (TagInline,ContainerInline,)

    list_display = (
        "name",
        "created_user",
        "importance",
        "description",
        "count_containers",
        "order",
    )

class ProjectInline(admin.TabularInline):

    model = models.Project

