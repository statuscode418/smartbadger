from django.test import TestCase
from rest_framework.renderers import JSONRenderer

from .serializers import Contract, ContractSerializer


class TestSerializers(TestCase):
    def setUp(self):
        pass

    def test_contract(self):
        obj = Contract()
        serialized = ContractSerializer(obj)
        json = JSONRenderer().render(serialized.data)
        print(json)
