"""codexpose URL Configuration"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.views.generic import RedirectView

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.schemas import get_schema_view
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer

SCHEMA_VIEW = get_schema_view(title='codeXpose API',
                              renderer_classes=[OpenAPIRenderer,
                                                SwaggerUIRenderer])

# using RedirectView to avoid impact on Json rendering
urlpatterns = [  # pylint: disable=invalid-name
    path('', RedirectView.as_view(url="/admin/")),
    path('admin/', admin.site.urls),
    path('interview/', include('interview.urls', namespace='interview')),
    path('api-token-auth/', obtain_jwt_token),
    path('docs/', SCHEMA_VIEW),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
]
