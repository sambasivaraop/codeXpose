"""Factory modul for testcases."""
import factory
from .models import User
from .models import Test


class TestFactory(factory.Factory):
    """Test factory for Test models."""
    class Meta:
        """Meta class for Test model factory."""
        model = Test


class UserFactory(factory.Factory):
    """Test factory for User models."""
    class Meta:
        """Meta class for User model factory."""
        model = User

    email = "abc@example.com"
