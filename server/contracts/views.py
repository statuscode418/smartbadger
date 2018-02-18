from django.conf import settings
from django.shortcuts import get_object_or_404
from eth_utils import is_address
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
import web3

from .serializers import Contract, ContractSerializer


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

        provider = web3.Web3(web3.HTTPProvider(settings.PROVIDER_URL))
        balance = float(web3.Web3.fromWei(provider.eth.getBalance(pk), 'ether'))
        serializer = ContractSerializer(Contract(pk, balance))
        return Response(serializer.data)
