from django.contrib.auth import views
from django.contrib.auth import forms
from django.urls import reverse_lazy
from users.models import User
from django.shortcuts import render


class CustomPasswordResetView(views.PasswordResetView):
    email_template_name = 'auth/email_template.html'
    template_name = 'auth/password_reset.html'
    success_url = reverse_lazy('auths:password_reset_done')
    form_class = forms.PasswordResetForm
    subject_template_name = 'auth/password_reset_subject.txt'

    def form_valid(self, form):
        if User.objects.filter(email=self.request.POST.get("email")).exists():
            opts = {
            'use_https': self.request.is_secure(),
            'token_generator': self.token_generator,
            'from_email': 'joseph@mail.flglance.net',
            'email_template_name': self.email_template_name,
            'subject_template_name': self.subject_template_name,
            'request': self.request,
            'html_email_template_name': self.html_email_template_name,
            'extra_email_context': self.extra_email_context,
            }
            form.save(**opts)
            return super().form_valid(form)
        else:
            return render(self.request, 'auth/password_reset_done_fail.html')
            
class CustomPasswordResetDoneView(views.PasswordResetDoneView):
    template_name = 'auth/password_reset_done.html'

class CustomPasswordResetConfirmView(views.PasswordResetConfirmView):
    template_name = 'auth/password_reset_confirm.html'
    success_url = reverse_lazy('auths:password_reset_complete')

class CustomPasswordResetCompleteView(views.PasswordResetCompleteView):
    template_name = 'auth/password_reset_complete.html'


