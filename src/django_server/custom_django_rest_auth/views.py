import rest_framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponseRedirect
from django.urls import reverse
import requests
import json
# Social auth imports
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
# URLs
from django.conf import settings


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'login': rest_framework.reverse.reverse('rest_login', request=request, format=format),
    })


def accountEmailConfirm(request, key):
	''' Confirm user email and redirect to the email_confirm_status page'''
	protocol = 'https://' if request.is_secure() else 'http://'
	app_domain = request.META['HTTP_HOST']
	url = f'{protocol}{app_domain}/rest-auth/registration/verify-email/'
	headers = {'content-type': 'application/json'}
	data = {'key': key}
	r = requests.post(url, data=json.dumps(data), headers=headers)
	current_site = get_current_site(request)
	status = 'ok' if r.status_code == 200 else 'failed'
	return HttpResponseRedirect(f'http://{current_site}/confirm-email/status/{status}/')


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = settings.LANDING_URL
    client_class = OAuth2Client