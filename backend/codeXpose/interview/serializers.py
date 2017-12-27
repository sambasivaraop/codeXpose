from rest_framework import serializers
from . models import Question, User


class QuestionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
