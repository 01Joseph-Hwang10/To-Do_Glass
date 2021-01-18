from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models as user_model
from todos import models as todos_model


class ProjectInline(admin.TabularInline):

    model = todos_model.Project


@admin.register(user_model.User)
class CustomUserAdmin(UserAdmin):

    inlines = (ProjectInline,)

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
        "followers_count"
    )