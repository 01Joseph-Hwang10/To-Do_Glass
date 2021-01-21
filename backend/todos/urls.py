from django.urls import include, path
from rest_framework import routers
from . import views

app_name = "todos"

router = routers.DefaultRouter()
router.register(r'task', views.TaskViewSet,basename="task")
router.register(r'container', views.ContainerViewSet,basename="container")
router.register(r'project',views.ProjectViewSet,basename="project")
router.register(r'public_task', views.PublicTaskViewSet,basename="public_task")
router.register(r'public_container', views.PublicContainerViewSet,basename="public_container")
router.register(r'public_project',views.PublicProjectViewSet,basename="public_project")


urlpatterns = [
    path('', include((router.urls))),
]