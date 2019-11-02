# cookbook/ingredients/schema.py
import requests
import json
import graphene
import os
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from django.conf import settings

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# Exceptions
from graphql import GraphQLError


# Graphene will automatically map the Category model's fields onto the CategoryNode.
# This is configured in the CategoryNode's Meta class (as you can see below)
SERVER_URL = settings.SERVER_URL


###########
# Queries #
###########

class UserNode(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = ['username']
        exclude_fields = ('password', 'is_superuser', 'is_staff', 'note_set')
        interfaces = (relay.Node, )


class Query(object):
    token_is_valid = graphene.Boolean(key=graphene.String())
    profile = graphene.Field(UserNode)

    def resolve_token_is_valid(self, info, key):
        # Check if the token for a user exist and is valid
        try:
            Token.objects.get(key=key)
        except Token.DoesNotExist:
            return False
        return True

    def resolve_profile(self, info):
        if info.context.user.is_authenticated:
            return User.objects.get(username=info.context.user)
        else:
            return GraphQLError("You are not authenticated. Please login first")


#############
# Mutations #
#############

class Login(relay.ClientIDMutation):
    class Input:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    key = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        data = {
            'username': input['username'],
            'password': input['password']
        }
        response = requests.post(f"{SERVER_URL}/rest-auth/login/", data=data)
        data = json.loads(response.text)
        if response.status_code == 200:
            return Login(data['key'])
        elif response.status_code == 400:
            return GraphQLError(response.text)
        else:
            return None


class Logout(relay.ClientIDMutation):
    class Input:
        key = graphene.String(required=True)

    detail = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        response = requests.post(
            f"{SERVER_URL}/rest-auth/logout/",
            headers={'authorization': f"Token {input['key']}"})
        if response.status_code == 200:
            data = json.loads(response.text)
            return Logout(data['detail'])
        elif response.status_code == 400:
            return GraphQLError(response.text)
        else:
            return None


class AuthWithFacebook(relay.ClientIDMutation):
    class Input:
        access_token = graphene.String(required=True)
        # code = graphene.String()

    key = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        data = {
            'access_token': input['access_token'],
        }
        response = requests.post(f"{SERVER_URL}/rest-auth/facebook/", data=data)
        if response.status_code == 200:
            data = json.loads(response.text)
            return AuthWithFacebook(data['key'])
        elif response.status_code == 400:
            return GraphQLError(response.text)
        else:
            return GraphQLError(response.text)


class AuthWithGitHub(relay.ClientIDMutation):
    class Input:
        code = graphene.String(required=True)

    key = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        data = {'code': input['code'],}
        response = requests.post(f"{SERVER_URL}/rest-auth/github/", data=data)
        if response.status_code == 200:
            data = json.loads(response.text)
            return AuthWithGitHub(data['key'])
        elif response.status_code == 400:
            return GraphQLError(response.text)
        else:
            return GraphQLError(response.text)


class AuthWithTwitter(relay.ClientIDMutation):
    class Input:
        code = graphene.String(required=True)

    key = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        data = {'code': input['code'],}
        response = requests.post(f"{SERVER_URL}/rest-auth/twitter/", data=data)
        data = json.loads(response.text)
        if response.status_code == 200:
            return AuthWithTwitter(data['key'])
        elif response.status_code == 400:
            return GraphQLError(response.text)
        else:
            return None


class Registration(relay.ClientIDMutation):
    class Input:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password1 = graphene.String(required=True)
        password2 = graphene.String(required=True)

    key = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        data = {
            'username': input['username'],
            'email': input['email'],
            'password1': input['password1'],
            'password2': input['password2'],
        }
        response = requests.post(
            f"{SERVER_URL}/rest-auth/registration/", data=data
        )
        if response.status_code != 400:
            data = json.loads(response.text)
            return Registration(data['key'])
        elif response.status_code == 400:
            return GraphQLError(response.text)
        else:
            return None


class ConfirmEmail(relay.ClientIDMutation):
    class Input:
        key = graphene.String(required=True)

    detail = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        data = { 'key': input['key'] }
        response = requests.post(
            f"{SERVER_URL}/rest-auth/registration/verify-email/", 
            data=data
        )
        if response.status_code != 400:
            data = json.loads(response.text)
            return ConfirmEmail(data['detail'])
        elif response.status_code == 400:
            return GraphQLError(response.text)
        else:
            return None


class PasswordReset(relay.ClientIDMutation):
    class Input:
        email = graphene.String(required=True)

    detail = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        data = { 'email': input['email'] }
        print('data', data)
        response = requests.post(
            f"{SERVER_URL}/rest-auth/password/reset/", data=data
        )
        if response.status_code == 200:
            data = json.loads(response.text)
            return PasswordReset(data['detail'])
        elif response.status_code == 400:
            return GraphQLError(response.text)
        else:
            return None


class PasswordResetConfirm(relay.ClientIDMutation):
    class Input:
        uid = graphene.String(required=True)
        token = graphene.String(required=True)
        new_password1 = graphene.String(required=True)
        new_password2 = graphene.String(required=True)

    detail = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        data = { 
            'uid': input['uid'],
            'token': input['token'],
            'new_password1': input['new_password1'],
            'new_password2': input['new_password2'],
        }
        response = requests.post(
            f"{SERVER_URL}/rest-auth/password/reset/confirm/", data=data
        )
        if response.status_code == 200:
            data = json.loads(response.text)
            return PasswordResetConfirm(data['detail'])
        elif response.status_code == 400:
            return GraphQLError(response.text)
        else:
            return None


class Mutation(ObjectType):
    login = Login.Field()
    logout = Logout.Field()
    auth_with_facebook = AuthWithFacebook.Field()
    auth_with_github = AuthWithGitHub.Field()
    registration = Registration.Field()
    confirm_email = ConfirmEmail.Field()
    password_reset = PasswordReset.Field()
    password_reset_confirm = PasswordResetConfirm.Field()