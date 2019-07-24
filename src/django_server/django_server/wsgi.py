"""
WSGI config for django_server project.

It support local and serverless environments.
Deploy app with `now` via GitHub, GitLab, or locally

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application


try:
	'''
	Retreive ENV_AS_BRANCH environment variable, provided by now.json file
	Set environment as name of the branch that the app was deployed using
	'''
	environment_as_branch = eval(os.environ['ENV_AS_BRANCH'])
except:
	environment_as_branch = False
	environment = False


if environment_as_branch:
	# GitHub
	try:
		# Set environment as the branch that the app was deployed using
		github_branch = os.environ['NOW_GITHUB_COMMIT_REF']
		print("Deploying from GitHub...")
		environment = github_branch
	except:
		environment = False


	# GitLab
	try:
		# Set environment as the branch that the app was deployed using
		gitlab_branch = os.environ['GITLAB_COMMIT_REF']
		print("Deploying from GitLab...")
		environment = gitlab_branch
	except:
		environment = False


# Local
if not environment:
	try:
		# If local `now` deployment
		environment = os.environ['DJANGO_ENV']
		print("Deploying locally...")
	except:
		# If local `manage.py` runserver
		environment = 'local'


# Set settings as environment name
os.environ.setdefault('DJANGO_SETTINGS_MODULE', f'django_server.settings.{environment}')


# Update environment variables from env.py based on environment name
exec(f'from django_server.env import {environment} as env_variables')
os.environ.update(env_variables)


# Logging
print(f'Set {environment} environment')


application = get_wsgi_application()
