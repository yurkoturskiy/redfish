# based on https://www.revsys.com/tidbits/keeping-django-model-objects-ordered/
from django.db import models, transaction
from django.db.models import F, Max, Q
from django.contrib.auth.models import User
from django.core import serializers
from random import randint
import requests
import json

class NoteManager(models.Manager):
    """ Manager to encapsulate bits of business logic """

    def reorder_by(self, field):
        users = User.objects.all()
        for user in users:
            qs = self.get_queryset().filter(owner=user).exclude(Q(title=None)| Q(title=""), Q(content=None) | Q(content="")).order_by(field)

            for index, note in enumerate(qs.filter(pinned=True)):
                # pinned on top
                note.order = index
                note.save()

            for index, note in enumerate(qs.filter(pinned=False)):
                # not pinned
                note.order = index
                note.save()


    def remove_order_gaps(self):
        """ Remove all gaps in ordering which somehow occured
        Remove the root cause of this issue """
        users = User.objects.all()
        for user in users:
            qs = self.get_queryset().filter(owner=user).order_by('order')
            for index, note in enumerate(qs):
                print(f'Old order: {note.order}. New order: {index + 1}')
                note.order = index + 1
                note.save()


    def fill_gaps(self, objects):
        """ Pass notes here before delete them or pin/unpin """
        qs = self.get_queryset()
        
        with transaction.atomic():
            for index, obj in enumerate(objects):
                try:
                    notes_to_update_order = qs.filter(order__gt=obj.order, order__lt=objects[index + 1].order ,owner=obj.owner, pinned=obj.pinned)
                except:
                    notes_to_update_order = qs.filter(order__gt=obj.order, owner=obj.owner, pinned=obj.pinned)
                finally:
                    notes_to_update_order.update(order=F('order') - (index + 1))
            

    def generateInitialNotesFile(self, records_amount):
        '''
        Generate notes without owner 
        to use them as initial notes for a new users.
        '''
        FILE_NAME = "./fixtures/initial_notes.json"
        sentences = lambda: randint(1, 12)
        url = lambda: f'https://baconipsum.com/api/?type=meat-and-filler&sentences={sentences()}&format=text'
        notes = []
        i = 0
        while i < records_amount:
            r = requests.get(url())
            if r.status_code == 200:
                note = {
                "model": "notes.note", # APP_NAME.MODEL_NAME
                "fields": {
                        "title": "",
                        "content": r.text,
                        "color": "WHITE",
                        "pinned": False,
                        "order": i
                    }
                }
                notes.append(note)
                print(f'{json.dumps(note, indent=4)}')
                i += 1
            else:
                print(f'{i} failed')
        
        with open(FILE_NAME, 'w') as file:
            file.write(json.dumps(notes, indent=4))


    def createNoOwnerNotesFromFile(self):
        '''
        Retrieve initial notes from 'initial_notes.json' file
        located in same directory
        '''
        get_qs = lambda: self.get_queryset().filter(owner=None)
        if len(get_qs()) == 0:
            try:
                with open('./fixtures/initial_notes.json', 'r') as initial_notes_file:
                    json_obj = initial_notes_file.read()
                    initial_notes = []
                    for note in serializers.deserialize("json", json_obj):
                        initial_notes.append(note.object)
                    initial_notes = self.bulk_create(initial_notes)
                    print("initial notes", initial_notes)
                    return initial_notes
            except FileNotFoundError:
                print("There is no initial_notes.json file. Create it with `generateInitialNotesFile` manager")
                return False
        else:
            print("There is already some initial notes without owner")  
            return False


    def createInitialNotes(self, **kwargs):
        '''
            Clone notes without owner and assign given owner
        '''
        def getNoOwnerNotes():
            get_qs = lambda: self.get_queryset().filter(owner=None)
            qs = get_qs()
            if len(qs) == 0:
                initial_notes = self.createNoOwnerNotesFromFile()
                if initial_notes is False: return False
                return get_qs()
            return qs

        initial_notes = []

        for i in getNoOwnerNotes():
            i.pk = None
            i.owner = kwargs['owner']
            initial_notes.append(i)

        self.bulk_create(initial_notes)


    def move(self, obj, new_order):
        """ Move an object to a new order position """

        qs = self.get_queryset()

        with transaction.atomic():
            if obj.order > int(new_order):
                qs.filter(
                    owner=obj.owner,
                    order__lt=obj.order,
                    order__gte=new_order,
                    pinned=obj.pinned
                ).exclude(
                    pk=obj.pk
                ).update(
                    order=F('order') + 1,
                )
            else:
                qs.filter(
                    owner=obj.owner,
                    order__lte=new_order,
                    order__gt=obj.order,
                    pinned=obj.pinned
                ).exclude(
                    pk=obj.pk,
                ).update(
                    order=F('order') - 1,
                )

            obj.order = new_order
            obj.save()

    def pin(self, obj):
        # Set pinned to True and set order to the end of pinned notes
        if not obj.pinned:
            new_order = len(self.filter(owner=obj.owner, pinned=True))
            self.fill_gaps([obj])
            obj.pinned = True
            obj.order = new_order # order to the end of pinned
            obj.save()

    def unpin(self, obj):
        # Set pinned to False and set order to the beginning of unpinned notes
        if obj.pinned:
            self.fill_gaps([obj])
            obj.pinned = False
            # Get our current max order number
            end_order = len(self.filter(owner=obj.owner, pinned=False))
            obj.order = end_order # Set order to the end of unpinned
            obj.save()
            self.move(obj, 0) # Move to the beginning



    def create(self, **kwargs):
        instance = self.model(**kwargs)

        with transaction.atomic():
            # Get our current max order number
            try: 
                owner = kwargs['owner']
            except KeyError:
                owner = None

            end_order = len(self.filter(owner=owner, pinned=False))
            instance.order = end_order
            instance.save()
            self.move(instance, 0) # move the order to 0

            return instance