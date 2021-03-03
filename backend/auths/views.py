from django.contrib.auth import views
from django.contrib.auth import forms
from django.urls import reverse_lazy
from users.models import User
from django.shortcuts import render


class CustomPasswordResetView(views.PasswordResetView):
    template_name = 'auth/password_reset.html'
    success_url = reverse_lazy('auth/password_reset_done')
    form_class = forms.PasswordResetForm

    def form_valid(self, form):
        if User.objects.filter(email=self.request.POST.get("email")).exists():
            return super().form_valid(form)
        else:
            return render(self.request, 'auth/password_reset_done_fail.html')
            
class CustomPasswordResetDoneView(views.PasswordResetDoneView):
    template_name = 'auth/password_reset_done.html'

class CustomPasswordResetConfirmView(views.PasswordResetConfirmView):
    template_name = 'auth/password_reset_confirm.html'

class CustomPasswordResetCompleteView(views.PasswordResetCompleteView):
    template_name = 'auth/password_reset_complete.html'


