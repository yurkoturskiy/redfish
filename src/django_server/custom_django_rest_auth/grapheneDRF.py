# Source https://github.com/graphql-python/graphene-django/issues/476
# Author https://github.com/vinayan3

from django.http import HttpResponse
from graphene_django.views import GraphQLView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
import json

class AuthenticatedGraphQLView(GraphQLView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [AllowAny]

  def authenticate_request(self, request):
    for auth_class in self.authentication_classes:
      auth_tuple = auth_class().authenticate(request)
      if auth_tuple:
        request.user, request.token = auth_tuple
        break

  def check_permissions(self, request):
    for permission_class in self.permission_classes:
      if not permission_class().has_permission(request, self):
        return False
    return True

  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    try:
      self.authenticate_request(request)
      has_permission = self.check_permissions(request)
      if not has_permission:
        return HttpResponse(
            json.dumps({'errors': ['permission denied']}),
            status=status.HTTP_403_FORBIDDEN,
            content_type='application/json')
    except AuthenticationFailed as auth_failed_error:
      return HttpResponse(
          json.dumps({
            'errors': [str(auth_failed_error)]
          }),
          status=status.HTTP_401_UNAUTHORIZED,
          content_type='application/json')
    return super(AuthenticatedGraphQLView, self).dispatch(request, *args, **kwargs)