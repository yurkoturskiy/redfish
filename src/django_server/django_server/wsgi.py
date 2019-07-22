"""
WSGI config for django_server project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os
from django_server.env import ENV_PROD_VARIABLES, ENV_DEV_VARIABLES
from django.core.wsgi import get_wsgi_application


def set_production():
	print('set production environment')
	os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_server.settings.production')
	os.environ.update(ENV_PROD_VARIABLES) # export prod env variables

def set_development():
	print('set development environment')
	os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_server.settings.development')
	os.environ.update(ENV_DEV_VARIABLES) # export dev env variables

try:
	environment = os.environ['ENVIRONMENT']
	if environment == 'production':
		set_production()
	else:
		set_development()
except:
	set_development()

application = get_wsgi_application()
