from django.http import HttpResponse
import requests

def confirm_email(request, key):
    url = 'http://127.0.0.1:9000/'
    endpoint = 'rest-auth/registration/verify-email/'
    # headers = {'Content-Type': 'application/json'},
    print('EMAIL CONFIRMING')
    print(key)
    # key = json.dumps(key)
    payload = {'key': key}
    # payload = json.dumps(payload)
    print(payload)
    r = requests.post(url + endpoint, data=payload) 
    print(r.status_code, r.reason)
    return HttpResponse('verified')
     

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'login': reverse('rest_login', request=request, format=format),
    })