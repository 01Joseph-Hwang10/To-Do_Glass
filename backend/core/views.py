from django.views.generic import TemplateView

class APILandingView(TemplateView):

    template_name = 'index.html'