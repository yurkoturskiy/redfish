# cookbook/ingredients/schema.py
import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Note
from django.contrib.auth.models import User


# Graphene will automatically map the Category model's fields onto the CategoryNode.
# This is configured in the CategoryNode's Meta class (as you can see below)
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
        return None

class UserNode(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = ['username']
        exclude_fields = ('password', 'is_superuser', 'is_staff',)
        interfaces = (relay.Node, )


class Query(object):
    note = relay.Node.Field(NoteNode)
    all_notes = DjangoFilterConnectionField(NoteNode)
    # user = relay.Node.Field(UserNode)
    profile = DjangoFilterConnectionField(UserNode)

    def resolve_all_notes(self, info):
        # context will reference to the Django request
        if not info.context.user.is_authenticated:
            return Note.objects.none()
        else:
            return Note.objects.filter(owner=info.context.user)

    def resolve_profile(self, info):
        if info.context.user.is_authenticated:
            return User.objects.filter(username=info.context.user)


class CreateNote(relay.ClientIDMutation):

    class Input:
        title = graphene.String(required=False)
        content = graphene.String(required=False)

    new_note = graphene.Field(NoteNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        owner = User.objects.get(username=info.context.user)
        note = Note.objects.create(owner=owner, **input)
        print(note)
        return CreateNote(new_note=note)


class Mutation(ObjectType):
    create_note = CreateNote.Field()     
