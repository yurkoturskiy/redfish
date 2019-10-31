from django.urls import path, re_path
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

# GraphQL
from django.views.decorators.csrf import csrf_exempt
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
    path('admin/', admin.site.urls),
    # GraphQL
    path('', csrf_exempt(AuthenticatedGraphQLView.as_view(graphiql=True))), # Private graphiQL url
    path('graphql/', csrf_exempt(AuthenticatedGraphQLView.as_view(graphiql=True))), # Private graphiQL url
    # REST Api
    url(r'^docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
    path('schema/', schema_view),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # confirm email
    url(r'^confirm/email/(?P<key>[-:\w]+)/$', 
        accountEmailConfirm, name="confirm_email"), # Frontend confirmation
    url(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', 
        accountEmailConfirm, name="account_confirm_email"), # Backend confirmation
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    url(r'^rest-auth/', include('custom_django_rest_auth.urls')),
    url(r'^confirm/password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        TemplateView.as_view(template_name="index.html"),
        name='password_reset_confirm'),
    path('email-confirm-status/<str:status>/', 
        TemplateView.as_view(template_name="index.html"),
        name='email_confirm_status'),
    # Social auth
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/github/$', GithubLogin.as_view(), name='github_login'),
    url(r'^accounts/', include('allauth.urls'), name='socialaccount_signup'),
]