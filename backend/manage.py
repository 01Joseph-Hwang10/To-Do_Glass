#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

# docker stop $(docker ps -a -q)
# docker rm $(docker ps -a -q)
# docker volume rm $(docker volume ls -q)
# docker rmi $(docker images -q)

# sudo kill -9 $(sudo lsof -t -i:80)

# docker exec -it to-do_glass_green_backend-green_1 /backend/manage.py createsuperuser


def main():

    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
