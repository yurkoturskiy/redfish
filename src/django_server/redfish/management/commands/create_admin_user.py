import sys
import logging

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User

from django.conf import settings


class Command(BaseCommand):
    help = 'Creates the initial admin user'

    def handle(self, *args, **options):
        if User.objects.filter(username="admin").exists():
            print("admin exists")
        else:
            u = User(username='admin')
            u.set_password('adminpass')
            u.is_superuser = True
            u.is_staff = True
            u.save()
            print("admin created")
        sys.exit()