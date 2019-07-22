import graphene

import notes.schema as notes
import custom_django_rest_auth.schema as auth


class Query(notes.Query, auth.Query, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass

class Mutation(notes.Mutation, auth.Mutation, graphene.ObjectType):
	pass

schema = graphene.Schema(query=Query, mutation=Mutation) 