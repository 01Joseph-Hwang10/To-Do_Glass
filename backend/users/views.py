import datetime
from datetime import datetime, timezone, timedelta
# from django.http import HttpResponse
from rest_framework import viewsets, permissions, response, generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as authtoken_view
from .serializers import UserSerializer
from . import models

# Authenticated View


class CustomAuthToken(authtoken_view.ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        # try:
            serializer = self.serializer_class(data=request.data,
                                               context={'request': request})
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            expires = datetime.now(timezone.utc)+timedelta(weeks=54)
            expires_str = expires.strftime('%a, %w %b %Y %X GMT')
            cookie=f"access_token={token.key}; Expires={expires_str}; Secure; HttpOnly, remember_me=true"
            headers = {
                "Set-Cookie":cookie,
                "vary":"Origin, Accept-Encoding, Cookie"
            }
            auth_response = response.Response(status=200,data={"user_id":user.id},headers=headers)
            # auth_response['Cookie'] = cookie
            auth_response.set_cookie(key="access_token",value=token.key,expires=expires_str,path='/',secure=True,httponly=True)
            return auth_response
        # except Exception:
        #     print("wrong?")
        #     return response.Response(status=404,data="Authorization Failed")



class UserViewSet(viewsets.ModelViewSet):

    queryset = models.User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)


    def partial_update(self, request, *args, **kwargs):
        try: # Follow
            data=request.data
            following_user_id=data['id']
            following_user=models.User.objects.get(id=following_user_id)
            followed_user_id=int(request.data['following'])
            if(bool(data['data'])):
                following_user.following.add(models.User.objects.get(id=followed_user_id))
                following_user.save()
            else:
                following_user.following.remove(models.User.objects.get(id=followed_user_id))
                following_user.save()
            return response.Response(data="Saved successfully")
        except Exception: # Else
            kwargs['partial'] = True
            return self.update(request, *args, **kwargs)


# Public View



class SignUpView(generics.CreateAPIView):

    queryset = models.User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        try:
            post_data = request.data
            first_name=post_data['first_name']
            email=post_data['email']
            username=email
            password=post_data['password']
            new_object =models.User(
                username=username,
                first_name=first_name,
                last_name="",
                email=email,
                )
            new_object.set_password(password)
            new_object.save()
            return response.Response(status=201, data="Signed Up Successfully!")
        except Exception:
            return response.Response(status=500, data="Internal Server Error")



class PublicUserViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
