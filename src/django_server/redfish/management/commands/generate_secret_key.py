import sys
from django.core.management.base import BaseCommand, CommandError
from django.core.management.utils import get_random_secret_key


class Command(BaseCommand):
    help = 'Print random secret key for the settings.py file'

    def handle(self, *args, **options):
        key = get_random_secret_key()
        print('Paste the next string to the settings.py SECRET_KEY constant')
        print(key)
        sys.exit()
