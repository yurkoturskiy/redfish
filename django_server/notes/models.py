from django.db import models
from .managers import NoteManager
import notes
import os


class Color(models.Model):
	label = models.CharField(max_length=30)
	value = models.CharField(max_length=7)

	def __str__(self):
		return self.label


def get_image_path(instance, filename):
		return os.path.join(os.path.dirname(notes.__file__), str(instance.id), filename)

class Image(models.Model):
	image = models.ImageField(upload_to=get_image_path,)
	note = models.ForeignKey('Note', on_delete=models.CASCADE,)


class Note(models.Model):
	class Meta:
		ordering = ['order']

	title = models.TextField(blank=True, null=True)
	content = models.TextField(blank=True,)
	color = models.ForeignKey('Color', on_delete=models.CASCADE, blank=True, null=True)
	pinned = models.BooleanField(default=False)
	owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, blank=False, null=False)
	created = models.DateTimeField(auto_now_add=True)
	edited = models.DateTimeField(auto_now=True)
	order = models.IntegerField(default=1)

	objects = NoteManager()

	def __str__(self):
		return self.title