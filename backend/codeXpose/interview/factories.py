import factory
from .models import User
from .models import Test
from .models import Question


class TestFactory(factory.Factory):
    class Meta:
        model = Test


class UserFactory(factory.Factory):
    class Meta:
        model = User

    email = "abc@example.com"
