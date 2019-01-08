from django.urls import path, re_path
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

from .views import confirm_email
from rest_auth.registration.views import VerifyEmailView, RegisterView


API_TITLE = 'Pastebin API'
API_DESCRIPTION = 'A Web API for creating and viewing highlighted code snippets.'
schema_view = get_schema_view(title=API_TITLE)

urlpatterns = [
    path('', TemplateView.as_view(template_name='build/index.html'), name='index'),
    path('schema/', schema_view),
    path('rest/', include('snippets.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
    url(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', 
        confirm_email, name="account_confirm_email"),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    url(r'^rest-auth/', include('custom_django_rest_auth.urls')),
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        TemplateView.as_view(template_name="index.html"),
        name='password_reset_confirm'),    
]