"""Serializer class for Questions and User."""
from rest_framework import serializers
from .models import Question, User, Test, CandidateTestMapping, \
    CandidateSolution, CandidateResult


class QuestionSerializers(serializers.ModelSerializer):
    """Serializer class for Question model."""
    class Meta:
        """Meta class for QuestionSerializer."""
        model = Question
        fields = '__all__'


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
    question = QuestionSerializers(many=True, read_only=True)

    class Meta:
        """Meta class for TestSerializer."""
        model = Test
        fields = '__all__'


class CandidateTestMappingSerializer(serializers.ModelSerializer):
    """Serializer class for CandidateTestMapping model"""
    class Meta:
        model = CandidateTestMapping
        fields = '__all__'


class CandidateResultSerializer(serializers.ModelSerializer):
    """Serializer class for CandidateResult model"""
    class Meta:
        model = CandidateResult
        fields = '__all__'


class CandidateSolutionSerializer(serializers.ModelSerializer):
    """Serializer class for CandidateSolution model"""
    class Meta:
        model = CandidateSolution
        fields = '__all__'
