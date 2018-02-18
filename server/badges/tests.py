from django.test import TestCase

from .views import magnitude_format

class BadgeTests(TestCase):
    def test_formats(self):
        self.assertEqual(magnitude_format(0), "0.0")
        self.assertEqual(magnitude_format(0.5), "0.5")
        self.assertEqual(magnitude_format(10), "10")
        self.assertEqual(magnitude_format(1000), "1.0k")
        self.assertEqual(magnitude_format(1500), "1.5k")
        self.assertEqual(magnitude_format(1500000), "1,500k")
