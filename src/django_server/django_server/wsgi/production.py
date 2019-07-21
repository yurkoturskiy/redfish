"""
WSGI config for django_server project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os
from django_server.env import ENV_PROD_VARIABLES
from django.core.wsgi import get_wsgi_application

os.environ.update(ENV_PROD_VARIABLES)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_server.settings.production')

application = get_wsgi_application()
