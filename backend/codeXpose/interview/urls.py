from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url

from rest_framework import routers

from .views import QuestionViewSet
from .views import UserViewSet
from .views import TestViewSet

router = routers.DefaultRouter()
router.register(r'question', QuestionViewSet)
router.register(r'user', UserViewSet)
router.register(r'test', TestViewSet)

interview_urlpatterns = router.urls

# urlpatterns = [
#     path('', include(router.urls)),
#     path('docs/', schema_view),
#     # path('login/', UserViewSet.as_view({'post':'login'})),
# ]