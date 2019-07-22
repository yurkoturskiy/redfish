"""
WSGI config for django_server project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

try:
	environment = os.environ['ENV']
except:
	environment = 'development'

# Import env variables
exec(f'from django_server.env import {environment} as env_variables')
print(f'set {environment} environment')
# Set settings depends on environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', f'django_server.settings.{environment}')
# Set env variables
os.environ.update(env_variables)

application = get_wsgi_application()
