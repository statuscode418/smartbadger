from django.shortcuts import get_object_or_404
from eth_utils import is_address
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from .serializers import Contract, ContractSerializer


class ContractViewSet(viewsets.ViewSet):
    """List and get contracts"""
    def list(self, request):
        data = [Contract()]
        serializer = ContractSerializer(data, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        if not is_address(pk):
            raise ValidationError("Address is improperly formatted")
        serializer = ContractSerializer(Contract())
        return Response(serializer.data)
