from .views import ContractViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'contracts', ContractViewSet, base_name='contract')
urlpatterns = router.urls
