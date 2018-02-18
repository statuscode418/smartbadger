from django.conf import settings
from django.core.cache import cache
from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.views import View
import web3

from contracts.views import get_daily_activity


class Badge(View):
    template = 'badges/sample.svg'


class SampleBadge(Badge):
    def get(self, request):
        text = request.GET.get('text', 'Contract Verified')
        return render(request, self.template, {'text': text}, content_type='image/svg+xml')


class BalanceBadge(Badge):
    """Returns the balance of the address in ether."""
    def get(self, request, address):
        key = '{}/balance'.format(address)
        cached = cache.get(key)
        if cached:
            return HttpResponse(cached, content_type='image/svg+xml')

        if not web3.Web3.isAddress(address):
            attrs = {'text': 'Invalid Address'}
            return render(request, self.template, attrs, content_type='image/svg+xml')

        provider = web3.Web3(web3.HTTPProvider(settings.PROVIDER_URL))
        balance = web3.Web3.fromWei(provider.eth.getBalance(address), 'ether')
        attrs = {
            'text': '{:.6f} Ether'.format(balance),
        }
        rendered = render_to_string(self.template, attrs)
        cache.set(key, rendered)
        return HttpResponse(rendered, content_type='image/svg+xml')


def magnitude_format(number):
    if number < 10:
        return "{:.1f}".format(number)
    if number < 1e3:
        return "{:.0f}".format(number)
    if number < 1e6:
        return "{:.1f}k".format(number / 1e3)
    return "{:,.0f}k".format(number / 1e3)


class DailyTransactionsBadge(Badge):
    """Returns an estimate of daily transactions."""
    def get(self, request, address):
        key = '{}/activity'.format(address)
        cached = cache.get(key)
        if cached:
            return HttpResponse(cached, content_type='image/svg+xml')

        if not web3.Web3.isAddress(address):
            attrs = {'text': 'Invalid Address'}
            return render(request, self.template, attrs, content_type='image/svg+xml')

        activity = get_daily_activity(address)
        if activity is None:
            attrs = {'text': 'Unknown Daily Txs'}
            return render(request, self.template, attrs, content_type='image/svg+xml')

        attrs = {
            'text': '{} Daily Txs'.format(magnitude_format(activity)),
        }
        rendered = render_to_string(self.template, attrs)
        cache.set(key, rendered)
        return HttpResponse(rendered, content_type='image/svg+xml')
