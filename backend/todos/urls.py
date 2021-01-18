from django.urls import include, path
from rest_framework import routers
from . import views

app_name = "todos"

router = routers.DefaultRouter()
router.register(r'task', views.TaskViewSet)
router.register(r'container', views.ContainerViewSet)
router.register(r'project',views.ProjectViewSet)
router.register(r'public_task', views.PublicTaskViewSet)
router.register(r'public_container', views.PublicContainerViewSet)
router.register(r'public_project',views.PublicProjectViewSet)


urlpatterns = [
    path('', include((router.urls))),
]