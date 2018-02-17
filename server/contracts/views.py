from django.shortcuts import get_object_or_404
from .serializers import Contract, ContractSerializer
from rest_framework import viewsets
from rest_framework.response import Response


class ContractViewSet(viewsets.ViewSet):
    """List and get contracts"""
    def list(self, request):
        data = [Contract()]
        serializer = ContractSerializer(data, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        serializer = ContractSerializer(Contract())
        return Response(serializer.data)
