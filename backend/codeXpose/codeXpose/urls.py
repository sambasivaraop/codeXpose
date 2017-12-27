"""codeXpose URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url

from rest_framework import routers

from rest_framework_swagger.views import get_swagger_view

from interview.views import QuestionViewSet
from interview.views import UserViewSet

schema_view = get_swagger_view(title='codeXpose API')

router = routers.DefaultRouter()
router.register(r'Question', QuestionViewSet)
router.register(r'User', UserViewSet)
# urlpatterns = router.urls

urlpatterns = [
    url('admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^docs/', schema_view),
]
