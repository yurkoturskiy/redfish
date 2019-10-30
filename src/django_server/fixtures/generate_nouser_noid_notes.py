# This script generating notes for all users
import requests
from random import randint
import json
# setup django environment
import sys, os, django
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR) #here store is root folder(means parent).
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_server.settings.local")
django.setup()

from notes.models import Note

RECORDS_AMOUNT = 100 # for each user

def create_notes():
	sentences = lambda: randint(1, 12)
	url = lambda: f'https://baconipsum.com/api/?type=meat-and-filler&sentences={sentences()}&format=text'
	for i in range(RECORDS_AMOUNT):
		r = requests.get(url())
		if r.status_code == 200:
			fish = {
				"model": "notes.note", # APP_NAME.MODEL_NAME
				"fields": {
					"title": "",
					"content": r.text,
					"color": "WHITE",
					"pinned": False,
				}
			}
			Note.objects.create(title="", content=r.text, color="WHITE", pinned=False)
			print(f'{json.dumps(fish, indent=4)}')
		else:
			print(f'{i} failed')

if __name__ == '__main__':
		create_notes()