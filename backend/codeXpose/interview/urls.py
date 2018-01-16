"""This module contains urls for Interview application."""
from rest_framework import routers

from .views import QuestionViewSet
from .views import TestViewSet
from .views import UserViewSet


router = routers.DefaultRouter()
router.register(r'question', QuestionViewSet)
router.register(r'user', UserViewSet)
router.register(r'test', TestViewSet)

app_name = 'interview'
urlpatterns = []
urlpatterns += router.urls
