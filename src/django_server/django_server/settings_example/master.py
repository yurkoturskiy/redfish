from django_server.settings.common import *

#URLs
SERVER_URL = 'https://redfish-server.guandjoy.now.sh'
LANDING_URL = 'https://redfish-project.gq'
APPLICATION_URL = 'https://app.redfish-project.gq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

try:
	ALLOWED_HOSTS = ['.now.sh', LANDING_URL, APPLICATION_URL]
except:
	ALLOWED_HOSTS = ['localhost']

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'server_production', # dbname
        'USER': 'username', # master username
        'PASSWORD': 'MllVzrRbc3EvT3S', # master password
        'HOST': 'aws-postgres-rds.c7ferewofaar.eu-central-1.rds.amazonaws.com', # Endpoint
        'PORT': '5432',
    }
}


# The AWS region to connect to.
AWS_REGION = "eu-central-1"

# The AWS access key to use.
AWS_ACCESS_KEY_ID = "AKVFR2GVEGBCY6V3BTXL"

# The AWS secret access key to use.
AWS_SECRET_ACCESS_KEY = "jJW+H59ICNLhzANevfsSJvLolo/SVRNH5K43edmP"

# AWS S3 settings
S3_BUCKET = "server-production-static" # Put the name of your S3 bucket here
STATICFILES_STORAGE = "django_s3_storage.storage.StaticS3Storage"
AWS_S3_BUCKET_NAME_STATIC = S3_BUCKET
STATIC_URL = "https://%s.s3.amazonaws.com/" % S3_BUCKET
