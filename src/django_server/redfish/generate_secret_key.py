from django.core.management.utils import get_random_secret_key

key = get_random_secret_key()
print('Paste the next string to the settings.py SECRET_KEY constant')
print(key)
