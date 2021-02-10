from django.urls import include, path
from rest_framework import routers
from . import views

app_name = "todos"

router = routers.DefaultRouter()
router.register(r'tasks', views.TaskViewSet,'task')
router.register(r'containers', views.ContainerViewSet,'container')
router.register(r'projects',views.ProjectViewSet,'project')
router.register(r'tags',views.TagViewSet,'tag')
router.register(r'public_tasks', views.PublicTaskViewSet,'public_task')
router.register(r'public_containers', views.PublicContainerViewSet,'public_container')
router.register(r'public_projects',views.PublicProjectViewSet,'public_project')
router.register(r'public_tags',views.PublicTagViewSet,'public_tag')


urlpatterns = [
    path('', include((router.urls))),
    path('glance/',views.SortedProjectView.as_view(),name="glance")
]