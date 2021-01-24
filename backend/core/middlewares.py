from django.utils.deprecation import MiddlewareMixin
from users.mixins import get_cookie


class CustomHeaderMiddleware(MiddlewareMixin):
    def process_request(self, request):
        try:
            cookie=get_cookie(request)
            access_token=cookie['access_token']
            user_id=cookie['user_id']
            request.META['Authorization'] = f'Bearer {access_token}'
        except:
            pass