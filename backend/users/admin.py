from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models as user_model
from todos import admin as todo_admin



@admin.register(user_model.User)
class CustomUserAdmin(UserAdmin):

    inlines = (todo_admin.ProjectInline,)

    fieldsets = UserAdmin.fieldsets + (
        (
            "Custom Profile",{
                "fields": (
                    "avatar",
                    "bio",
                )
            }
        ),
        (
            "Social",{
                "fields":(
                    "following",
                )
            }
        ),
    )

    list_filter = UserAdmin.list_filter

    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "is_active",
        "following_count",
        "followers_count",
        "projects_count",
        # "containers_count",
        # "tasks_count",
        # "tags_count",
    )