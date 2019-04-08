# This script generating notes for all users
import requests
from random import randint
import json
# setup django environment
import sys, os, django
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR) #here store is root folder(means parent).
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_server.settings")
django.setup()

from django.contrib.auth.models import User

RECORDS_AMOUNT = 100 # for each user
FILE_NAME = 'notes.json'
USERS = User.objects.all()


def create_notes():
	sentences = lambda: randint(1, 12)
	url = lambda: f'https://baconipsum.com/api/?type=meat-and-filler&sentences={sentences()}&format=text'
	fishes = []
	for user_index, user in enumerate(USERS):
		for i in range(RECORDS_AMOUNT):
			r = requests.get(url())
			if r.status_code == 200:
				fish = {
					"model": "notes.note", # APP_NAME.MODEL_NAME
					"pk": i + 100 + RECORDS_AMOUNT * user_index,
					"fields": {
						"title": "",
						"content": r.text,
						"color": None,
						"pinned": False,
						"owner": user.pk
					}
				}
				fishes.append(fish)
				print(f'{json.dumps(fish, indent=4)}')
			else:
				print(f'{i} failed')

	with open(FILE_NAME, 'w') as file:
		file.write(json.dumps(fishes, indent=4))

if __name__ == '__main__':
	if len(USERS) > 0:
		create_notes()
	else:
		print('Create new users first')