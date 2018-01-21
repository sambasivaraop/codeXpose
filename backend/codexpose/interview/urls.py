"""URLs file for Interview App."""
from rest_framework import routers

from .views import QuestionViewSet
from .views import UserViewSet
from .views import TestViewSet

router = routers.DefaultRouter()  # pylint: disable=invalid-name
router.register(r'question', QuestionViewSet)
router.register(r'user', UserViewSet)
router.register(r'test', TestViewSet)

interview_urlpatterns = router.urls  # pylint: disable=invalid-name
