# cookbook/ingredients/schema.py
import graphene
import os
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.converter import convert_django_field_with_choices
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id

from .models import Note


# Exceptions
from graphql import GraphQLError


# Graphene will automatically map the Category model's fields onto the CategoryNode.
# This is configured in the CategoryNode's Meta class (as you can see below)
SERVER_URL = os.environ['SERVER_URL']

###########
# Queries #
###########

class NoteNode(DjangoObjectType):
    class Meta:
        model = Note
        filter_fields = ['title', 'content', 'color', 'pinned']
        interfaces = (relay.Node, )

    @classmethod
    def get_node(cls, info, id):
        # get object by provided id
        try:
            note = cls._meta.model.objects.get(id=id)
        except cls._meta.model.DoesNotExist:
            return None
        # check the ownership
        if info.context.user == note.owner:
            return note
        # different owner. Not allowed
        return GraphQLError("Access denied")

  
class Query(object):
    note = relay.Node.Field(NoteNode)
    all_notes = DjangoFilterConnectionField(NoteNode)
    all_colors = graphene.List(graphene.String)

    def resolve_all_notes(self, info, **kwargs):
        # context will reference to the Django request
        if info.context.user.is_authenticated:
            return Note.objects.filter(owner=info.context.user)
        else:
            return Note.objects.none()

    def resolve_all_colors(self, info):
        colors = []
        for color in Note.COLOR_CHOICES:
            colors.append(color[0])
        return colors


#############
# Mutations #
#############

class AddNote(relay.ClientIDMutation):

    class Input:
        title = graphene.String(required=False)
        content = graphene.String(required=False)

    new_note = graphene.Field(NoteNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if info.context.user.is_authenticated:
            note = Note.objects.create(owner=info.context.user, **input)
            return AddNote(new_note=note)            
        else:
            return GraphQLError("You are not authenticated. Please login first")


class UpdateNotesColor(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        new_color = graphene.String(required=True)

    new_color = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if info.context.user.is_authenticated:
            local_id = from_global_id(input['id'])[1]
            try:
                note = Note.objects.get(id=local_id, owner=info.context.user)
            except Note.DoesNotExist:
                return None
            note.color = input['new_color']
            note.save()
            return UpdateNotesColor(input['new_color'])
        else:
            return GraphQLError("You are not authenticated. Please login first")


class UpdateNote(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        color = graphene.String()
        title = graphene.String()
        content = graphene.String()
        pinned = graphene.Boolean()
        order = graphene.Int()

    new_note = graphene.Field(NoteNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if info.context.user.is_authenticated:
            local_id = from_global_id(input['id'])[1]
            input.pop('id', None)
            try:
                notes = Note.objects.filter(id=local_id, owner=info.context.user)
            except Note.DoesNotExist:
                return None
            if 'color' in input:
                input['color'] = Color.objects.get(label=input['color'])
            notes.update(**input)
            return UpdateNote(notes[0])
        else:
            return GraphQLError("You are not authenticated. Please login first")


class DeleteNotes(relay.ClientIDMutation):
    class Input:
        ids = graphene.List(graphene.ID, required=True)

    deleted_notes = graphene.List(NoteNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if info.context.user.is_authenticated:
            local_ids = [from_global_id(i)[1] for i in input['ids']]
            try:
                notes = Note.objects.filter(id__in=local_ids, owner=info.context.user)
            except Note.DoesNotExist:
                return None
            snapshot = list(notes)
            Note.objects.fill_gaps(notes)
            notes.delete()
            return DeleteNotes(snapshot)
        else:
            return GraphQLError("You are not authenticated. Please login first")


class SwitchPinNotes(relay.ClientIDMutation):
    class Input:
        ids = graphene.List(graphene.ID, required=True)
        action = graphene.String(required=True)

    action = graphene.String()
    pinned_unpinned_notes = graphene.List(NoteNode)
    prev_pinned_status = graphene.List(graphene.Boolean)
    cur_pinned_status = graphene.List(graphene.Boolean)
    prev_order = graphene.List(graphene.Int)
    cur_order = graphene.List(graphene.Int)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if info.context.user.is_authenticated:
            local_ids = [from_global_id(i)[1] for i in input['ids']]
            try:
                notes = Note.objects.filter(id__in=local_ids, owner=info.context.user)
            except Note.DoesNotExist:
                return None
            prevOrder = []
            prevPinnedStatus = []
            for index, note in enumerate(notes):
                prevOrder.append(note.order)
                prevPinnedStatus.append(note.pinned)
                if input['action'] == "pin":
                    Note.objects.pin(note)
                else:
                    Note.objects.unpin(note)

            curPinnedStatus = [note.pinned for note in notes]
            curOrder = [note.order for note in notes]

            return SwitchPinNotes(input['action'], notes, prevPinnedStatus, curPinnedStatus, prevOrder, curOrder)
        else:
            return GraphQLError("You are not authenticated. Please login first")


class ReorderNote(relay.ClientIDMutation):
    """ Reorder note with move model's manager """
    class Input:
        id = graphene.ID(required=True)
        new_order = graphene.Int(required=True)

    new_note = graphene.Field(NoteNode)
    new_order = graphene.Int()
    old_order = graphene.Int()
    pinned = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        if info.context.user.is_authenticated:
            local_id = from_global_id(input['id'])[1]
            try:
                note = Note.objects.get(id=local_id, owner=info.context.user)
            except Note.DoesNotExist:
                return None

            old_order = note.order
            new_order = input['new_order']
            Note.objects.move(note, new_order)
            return ReorderNote(note, new_order, old_order, note.pinned)
        else:
            return GraphQLError("You are not authenticated. Please login first")





class Mutation(ObjectType):
    add_note = AddNote.Field()
    update_notes_color = UpdateNotesColor.Field()
    update_note = UpdateNote.Field()
    delete_notes = DeleteNotes.Field()
    switch_pin_notes = SwitchPinNotes.Field()
    reorder_note = ReorderNote.Field()

