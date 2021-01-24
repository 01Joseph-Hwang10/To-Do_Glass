import datetime
from datetime import datetime, timezone, timedelta
# from django.http import HttpResponse
from rest_framework import viewsets, permissions, response, generics, status
from rest_framework.authtoken.models import Token
# from rest_framework.authtoken import views as authtoken_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .serializers import UserSerializer
from users import models as user_model
from users import permissions as user_permission

# Authenticated View

class CustomTokenObtainPairView(TokenObtainPairView):
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            user_id = user_model.User.objects.get(username=request.data['username']).id
        except TokenError as e:
            raise InvalidToken(e.args[0])

        auth_response = response.Response(data={"user_id":user_id}, status=status.HTTP_200_OK)

        max_age_5min = 5*60
        max_age_2days = 2*24*60*60

        # Need to add Secure options!!
        auth_response.set_cookie("access_token",value=serializer.validated_data['access'],max_age=max_age_5min,httponly=True)
        auth_response.set_cookie("refresh_token",value=serializer.validated_data['refresh'],max_age=max_age_2days,httponly=True)
        auth_response.set_cookie("user_id",value=user_id,max_age=max_age_5min,httponly=True)

        return auth_response


class CustomTokenRefreshView(TokenRefreshView):
    
    def post(self, request, *args, **kwargs):

        raw_cookie = request.headers['Cookie'].split(";")
        cookie={}
        for e in raw_cookie:
            splited_e = e.split("=")
            cookie[splited_e[0].replace(" ","")]=splited_e[1]
        print(cookie)

        serializer = self.get_serializer(data={"refresh":cookie['refresh']})

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        auth_response = response.Response(serializer.validated_data, status=status.HTTP_200_OK)
            
        # max_age = 365 * 24 * 60 * 60
        max_age_5min = 5*60

        # Need to add Secure options!!
        auth_response.set_cookie("access_token",value=serializer.validated_data['access'],max_age=max_age_5min,httponly=True)
        auth_response.set_cookie("user_id",value=cookie['user_id'],max_age=max_age_5min,httponly=True)

        return auth_response


class LogoutView(generics.RetrieveAPIView):

    queryset = user_model.User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        auth_response = response.Response(status=status.HTTP_200_OK)
        auth_response.delete_cookie("access_token")
        auth_response.delete_cookie("refresh_token")
        auth_response.delete_cookie("user_id")
        return auth_response




# class CustomAuthToken(authtoken_view.ObtainAuthToken):

#     def post(self, request, *args, **kwargs):
#         # try:
#             serializer = self.serializer_class(data=request.data,
#                                                context={'request': request})
#             serializer.is_valid(raise_exception=True)
#             user = serializer.validated_data['user']
#             token, _ = Token.objects.get_or_create(user=user)
#             expires = datetime.now(timezone.utc)+timedelta(minutes=5)
#             expires_str = expires.strftime('%a, %w %b %Y %X GMT')
#             cookie=f"access_token={token.key}; Expires={expires_str}; Secure; HttpOnly, remember_me=true"
#             # headers = {
#             #     "Set-Cookie":cookie,
#             #     "vary":"Origin, Accept-Encoding, Cookie"
#             # }
#             auth_response = response.Response(status=200)
#             # auth_response['Cookie'] = cookie
#             auth_response.set_cookie(key="access_token",value=token.key,expires=expires_str,path='/',secure=True,httponly=True)
#             auth_response.data = {'access_token':token.key,'user_id':user.id}
#             return auth_response
#         # except Exception:
#         #     print("wrong?")
#         #     return response.Response(status=404,data="Authorization Failed")


class UserViewSet(viewsets.ModelViewSet):

    queryset = user_model.User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (user_permission.IsAllowedToWrite,)


    def partial_update(self, request, *args, **kwargs):
        try: # Follow
            data=request.data
            following_user_id=data['id']
            following_user=user_model.User.objects.get(id=following_user_id)
            followed_user_id=int(request.data['following'])
            if(bool(data['data'])):
                following_user.following.add(user_model.User.objects.get(id=followed_user_id))
                following_user.save()
            else:
                following_user.following.remove(user_model.User.objects.get(id=followed_user_id))
                following_user.save()
            return response.Response(data="Saved successfully")
        except Exception: # Else
            kwargs['partial'] = True
            return self.update(request, *args, **kwargs)

class CheckSelfAuthView(generics.CreateAPIView):

    queryset = user_model.User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (user_permission.IsAllowedToWrite,)

    def post(self,request):
        return response.Response(status=200, data={"isAuthenticated":True})




# Public View



class SignUpView(generics.CreateAPIView):

    queryset = user_model.User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        try:
            post_data = request.data
            first_name=post_data['first_name']
            email=post_data['email']
            username=email
            password=post_data['password']
            new_object =user_model.User(
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

    queryset = user_model.User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    
    def retrieve(self, request, *args, **kwargs):
        print(request.headers['Cookie'])
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data)
