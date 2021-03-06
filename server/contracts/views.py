from datetime import datetime

from django.conf import settings
from django.shortcuts import get_object_or_404
from eth_utils import is_address
import requests
from requests.exceptions import RequestException
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
import web3

from .serializers import Contract, ContractSerializer


def get_balance(address):
    provider = web3.Web3(web3.HTTPProvider(settings.PROVIDER_URL))
    balance = web3.Web3.fromWei(provider.eth.getBalance(address), 'ether')
    return float(balance) if balance else 0.0


def hex_to_date(hex):
    return datetime.fromtimestamp(int(hex, 16))


etherscan_uri = 'https://api.etherscan.io/api'

start_block = 5070000 # TODO this should be updated regularly
start_time = datetime(2018, 2, 11, 1, 39, 13)

SECONDS_PER_DAY = 86400
MAX_RESULTS = 1000 # TODO May change

# TODO how to best estimate a week ago?
# Currently using block 5070000 == datetime.datetime(2018, 2, 11, 1, 39, 13)
def get_daily_activity(address):
    """
    Estimate a daily number of transactions for the given address.

    The etherscan API will return a max of 1000 results, so some
    additional math is required.

    We will return None as an error condition, akin to "Unknown"
    """
    params = {
        'module': 'logs',
        'action': 'getLogs',
        'fromBlock': 5070000,
        'toBlock': 'latest',
        'address': address,
        'apikey': settings.ETHERSCAN_TOKEN,
    }

    try:
        r = requests.get(etherscan_uri, params=params)
    except RequestException:
        return None

    if r.status_code != 200:
        return None

    results = r.json().get('result', [])
    if not results:
        return 0.0

    if len(results) >= MAX_RESULTS:
        # Max results, estimate the daily activity from first and last result
        oldest = hex_to_date(results[0]['timeStamp'])
        newest = hex_to_date(results[-1]['timeStamp'])
        elapsed = (newest - oldest).seconds
        if not elapsed:
            # This would only happen if this address hit the max transactions
            # in the same block - amazing! If so, return a big number
            return 1e6

        # Otherwise estimate daily activity by the % of day it took
        # to hit the max transaction
        return (SECONDS_PER_DAY / elapsed) * len(results)

    # Otherwise we will estimate the daily activity in the past week
    # This will give a lower than expected number for contracts less
    # than a week old
    elapsed = (datetime.now() - start_time).seconds
    if not elapsed:
        # Should never happen, but don't divide by zero, ever
        return None

    # Estimate the daily activity
    return (SECONDS_PER_DAY / elapsed) * len(results)


class ContractViewSet(viewsets.ViewSet):
    """List and get contracts"""
    renderer_classes = (JSONRenderer, )

    def list(self, request):
        data = []
        serializer = ContractSerializer(data, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        if not is_address(pk):
            raise ValidationError("Address must be a 20 byte hexidecimal or byte string, with or without prefix and padding")

        balance = get_balance(pk)
        serializer = ContractSerializer(Contract(pk, balance))
        return Response(serializer.data)
