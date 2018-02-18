from django.shortcuts import render
from django.views import View


class SampleBadgeView(View):
    def get(self, request):
        text = request.GET.get('text', 'Contract Verified')
        return render(request, 'badges/sample.svg', {'text': text}, content_type='image/svg+xml')
