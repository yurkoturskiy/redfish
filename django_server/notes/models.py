from django.db import models
import notes
import os


class Color(models.Model):
	label = models.CharField(max_length=30)
	value = models.CharField(max_length=7)


def get_image_path(instance, filename):
		return os.path.join(os.path.dirname(notes.__file__), str(instance.id), filename)

class Image(models.Model):
	image = models.ImageField(upload_to=get_image_path,)
	note = models.ForeignKey('Note', on_delete=models.CASCADE,)


class Note(models.Model):
	title = models.TextField()
	content = models.TextField(blank=True,)
	color = models.ForeignKey('Color', on_delete=models.CASCADE,)
	pinned = models.BooleanField(default=False)
	author = models.ForeignKey('auth.User', on_delete=models.CASCADE)