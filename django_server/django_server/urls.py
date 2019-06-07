from django.urls import path, re_path
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

# GraphQL
from django.views.decorators.csrf import csrf_exempt
# from graphene_django.views import GraphQLView # For public GraphiQL
from custom_django_rest_auth.grapheneDRF import AuthenticatedGraphQLView # For privat GraphiQL

from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

from rest_auth.registration.views import VerifyEmailView
from custom_django_rest_auth.views import accountEmailConfirm
# Social auth
from custom_django_rest_auth.views import FacebookLogin, GithubLogin

API_TITLE = 'Pastebin API'
API_DESCRIPTION = 'A Web API for django-rest-auth.'
schema_view = get_schema_view(title=API_TITLE)

urlpatterns = [
    path('schema/', schema_view),
    path('admin/', admin.site.urls),
    # path('app/', TemplateView.as_view(template_name='react-note-app-index.html'), name='index.html'),
    # url(r'^app/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', appAuth, name='app'),)
    url(r'^graphql', csrf_exempt(AuthenticatedGraphQLView.as_view(graphiql=True))), # Private graphiQL url
    # url(r'^graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))), # Public GraphiQL url
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
    # confirm email
    url(r'^confirm-email/(?P<key>[-:\w]+)/$', 
        accountEmailConfirm, name="confirm_email"), # Frontend confirmation
    url(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', 
        accountEmailConfirm, name="account_confirm_email"), # Backend confirmation
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    url(r'^rest-auth/', include('custom_django_rest_auth.urls')),
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        TemplateView.as_view(template_name="index.html"),
        name='password_reset_confirm'),
    path('email-confirm-status/<str:status>/', 
        TemplateView.as_view(template_name="index.html"),
        name='email_confirm_status'),
    path('', TemplateView.as_view(template_name='index.html'), name='index.html'),
    path('app/', TemplateView.as_view(template_name='index.html'), name='index.html'),
    # Social auth
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/github/$', GithubLogin.as_view(), name='github_login'),
    url(r'^accounts/', include('allauth.urls'), name='socialaccount_signup'),
]