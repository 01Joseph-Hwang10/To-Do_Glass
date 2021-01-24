from django.utils.deprecation import MiddlewareMixin
from users.mixins import get_cookie


class CustomHeaderMiddleware(MiddlewareMixin):
    def process_request(self, request):
        try:
            cookie=get_cookie(request)
            access_token=cookie['access_token']
            # user_id=cookie['user_id']
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
        except:
            pass

# def CustomHeaderMiddleware(get_response):
#     def middleware(request):
#         cookie=get_cookie(request)
#         try:
#             access_token=cookie['access_token']
#         except Exception:
#             access_token=''
#         # user_id=cookie['user_id']
#         request.META['Authentication'] = f'Bearer {access_token}'
#         response = get_response(request)
#         response['Authentication'] = f'Bearer {access_token}'
#         print(response.headers)
#         return response
#     return middleware