from rest_framework import viewsets, permissions, response, generics
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as authtoken_view
from .serializers import UserSerializer
from . import models

# Authenticated View


class CustomAuthToken(authtoken_view.ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return response.Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })



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


class PublicUserViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
