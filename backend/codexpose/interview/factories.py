"""Factory modul for testcases."""
import factory
from .models import User
from .models import Test
from .models import Question


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


class QuestionFactory(factory.Factory):
    """Test factory for User models."""
    class Meta:
        """Meta class for Question model factory."""
        model = Question
    question_id = '1'
    title = "Binary Search"
    question_type = "Programming"
    problem_statement = "test.txt"
    test_cases = "test.py"
    skeleton = "test_code.py"
    marks = 100
