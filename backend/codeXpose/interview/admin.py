from django.contrib import admin

from . models import Test, Question, User, UserTestMapping

admin.site.register(Test)
admin.site.register(Question)
admin.site.register(User)
admin.site.register(UserTestMapping)