from django.db import models
from .managers import NoteManager
import notes
import os


def get_image_path(instance, filename):
		return os.path.join(os.path.dirname(notes.__file__), str(instance.id), filename)

class Image(models.Model):
	image = models.ImageField(upload_to=get_image_path,)
	note = models.ForeignKey('Note', on_delete=models.CASCADE,)


class Note(models.Model):
	class Meta:
		ordering = ['-pinned', 'order']

	COLOR_CHOICES = [
    	('WHITE', '#FFFFFF'),
    	('RED', '#F28B82'),
    	('ORANGE', '#FFD34F'),
    	('YELLOW', '#FFF476'),
    	('GREEN', '#D3F096'),
    	('BLUE', '#AFCBFA'),
    	('VIOLET', '#D7AEFC'),
	]

	title = models.TextField(blank=True, null=True)
	content = models.TextField(blank=True, null=True)
	color = models.CharField(max_length=6, choices=COLOR_CHOICES, default='WHITE')
	pinned = models.BooleanField(default=False)
	owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, blank=True, null=True)
	created = models.DateTimeField(auto_now_add=True)
	edited = models.DateTimeField(auto_now=True)
	order = models.IntegerField(default=1, null=False)

	objects = NoteManager()

	def __str__(self):
		return self.title if self.title else str(self.id)