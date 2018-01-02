from rest_framework import serializers
from .models import Question, User, Test


class QuestionSerializers(serializers.ModelSerializer):
    """Serializer class for Question model."""
    class Meta:
        model = Question
        fields = '__all__'


class UserSerializers(serializers.ModelSerializer):
    """Serializer class for User model."""
    class Meta:
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
    class Meta:
        model = Test
        fields = ('title', 'duration')
