# Generated by Django 3.1.5 on 2021-01-21 10:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todos', '0002_auto_20210119_0135'),
    ]

    operations = [
        migrations.AddField(
            model_name='container',
            name='completed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='task',
            name='completed',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='project',
            name='contributor',
            field=models.ManyToManyField(blank=True, related_name='project_contributor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='project',
            name='created_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_created_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
