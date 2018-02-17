from rest_framework import serializers


class Contract(object):
    def __init__(self):
        self.address = "0x06012c8cf97bead5deae237070f9587f8e7a266d"
        self.name = "Example Contract"
        self.transaction_count = 3
        self.block_number = 123346
        self.eth_balance = 5.6576


class ContractSerializer(serializers.Serializer):
    address = serializers.CharField() # TODO byte field?
    name = serializers.CharField()
    transaction_count = serializers.IntegerField()
    block_number = serializers.IntegerField()
    eth_balance = serializers.FloatField()
