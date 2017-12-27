from django.shortcuts import render
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from . models import Question, User
from . serializers import QuestionSerializers, UserSerializers


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializers

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers
