import rest_framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from django.urls import reverse
import requests
import json
# Social auth imports
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'login': rest_framework.reverse.reverse('rest_login', request=request, format=format),
    })


def accountEmailConfirm(request, key):
	''' Confirm user email and redirect to the email_confirm_status page'''
	url = (
		'https://' if request.is_secure() else 'http://'
		+ request.META['HTTP_HOST'] 
		+ '/rest-auth/registration/verify-email/'
	)
	headers = {'content-type': 'application/json'}
	data = {'key': key}
	r = requests.post(url, data=json.dumps(data), headers=headers)
	print(r.text)
	# response = json.loads(r.text)
	# print(response['detail'])
	if r.status_code == 200:
		status = 'ok'
		return HttpResponseRedirect(reverse('email_confirm_status', args=(status,)))
	else:
		status = 'failed'
		return HttpResponseRedirect(reverse('email_confirm_status', args=(status,)))


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter