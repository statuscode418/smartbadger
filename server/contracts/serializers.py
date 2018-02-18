from rest_framework import serializers


class Contract(object):
    def __init__(self, address, eth_balance):
        self.address = address
        self.eth_balance = eth_balance


class ContractSerializer(serializers.Serializer):
    address = serializers.CharField()
    eth_balance = serializers.FloatField()
