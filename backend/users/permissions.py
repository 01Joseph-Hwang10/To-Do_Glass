from rest_framework import permissions


class IsAllowedToWrite(permissions.IsAuthenticated):
    
    def has_permission(self, request, view, obj):
        print(request.user, obj)
        raw_cookie = request.headers['Cookie'].split(";")
        cookie={}
        for e in raw_cookie:
            splited_e = e.split("=")
            cookie[splited_e[0].replace(" ","")]=splited_e[1]
        print(cookie)
        isAuthenticated = bool(
            request.user and
            request.user.is_authenticated and
            request.user == obj and
            request.data['user_id'] == cookie['user_id']
            )
        return isAuthenticated