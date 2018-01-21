"""codexpose URL Configuration"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_swagger.views import get_swagger_view

from interview.urls import interview_urlpatterns

SCHEMA_VIEW = get_swagger_view(title='codexpose API')

urlpatterns = [  # pylint: disable=invalid-name
    path('admin/', admin.site.urls),
    path('interview/', include(interview_urlpatterns)),
    path('api-token-auth/', obtain_jwt_token),
    path('docs/', SCHEMA_VIEW),
]
