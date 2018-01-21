"""Serializer class for Questions and User."""
from rest_framework import serializers
from .models import Question, User, Test


class QuestionSerializers(serializers.ModelSerializer):
    """Serializer class for Question model."""
    class Meta:
        """Meta class for QuestionSerializer."""
        model = Question
        fields = ('question_id', 'title', 'question_type', 'problem_statement',
                  'skeleton')


class UserSerializers(serializers.ModelSerializer):
    """Serializer class for User model."""
    class Meta:
        """Meta class for UserSerializer."""
        model = User
        fields = '__all__'

    def create(self, validated_data):
        """create a user and store the hashed password."""
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class TestSerializers(serializers.ModelSerializer):
    """Serializer class for Test model."""
    question = QuestionSerializers(many=True)

    class Meta:
        """Meta class for TestSerializer."""
        model = Test
        fields = ('title', 'duration', 'question')
