"""codeXpose URL Configuration"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.schemas import get_schema_view
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer

schema_view = get_schema_view(title='codeXpose API',
                              renderer_classes=[OpenAPIRenderer,
                                                SwaggerUIRenderer])

urlpatterns = [
    path('admin/', admin.site.urls),
    path('interview/', include('interview.urls', namespace='interview')),
    path('api-token-auth/', obtain_jwt_token),
    path('docs/', schema_view),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
]
