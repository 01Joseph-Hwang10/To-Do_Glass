# Generated by Django 3.1.5 on 2021-01-22 14:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0004_auto_20210122_2257'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50)),
                ('tag_for', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='todos.project')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]