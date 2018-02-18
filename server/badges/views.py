from django.conf import settings
from django.shortcuts import render
from django.views import View
import web3


class Badge(View):
    template = 'badges/sample.svg'


class SampleBadge(Badge):
    def get(self, request):
        text = request.GET.get('text', 'Contract Verified')
        return render(request, self.template, {'text': text}, content_type='image/svg+xml')


class BalanceBadge(Badge):
    """Returns the balance of the address in ether."""
    def get(self, request, address):
        if not web3.Web3.isAddress(address):
            attrs = {'text': 'Invalid Address'}
            return render(request, self.template, attrs, content_type='image/svg+xml')

        provider = web3.Web3(web3.HTTPProvider(settings.PROVIDER_URL))
        balance = web3.Web3.fromWei(provider.eth.getBalance(address), 'ether')
        attrs = {
            'text': '{:.6f} Ether'.format(balance),
        }
        return render(request, self.template, attrs, content_type='image/svg+xml')
