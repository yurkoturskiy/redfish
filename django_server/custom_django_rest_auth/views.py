from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.http import HttpResponse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'login': reverse('rest_login', request=request, format=format),
    })

def appAuth(request, token):
	print(request)
	print(request.user)
	print(dir(request))
	return HttpResponse('aaa')