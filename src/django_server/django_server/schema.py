import graphene

import notes.schema
from notes.schema import Mutation

class Query(notes.schema.Query, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass

schema = graphene.Schema(query=Query, mutation=Mutation) 