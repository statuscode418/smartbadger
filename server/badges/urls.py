from django.contrib import admin
from django.urls import include, path

from .views import SampleBadge, BalanceBadge, DailyTransactionsBadge


urlpatterns = [
    path('sample.svg', SampleBadge.as_view(), name='sample'),
    path('<address>/balance.svg', BalanceBadge.as_view(), name='balance'),
    path(
        '<address>/activity.svg',
        DailyTransactionsBadge.as_view(),
        name='activity',
    ),
]
