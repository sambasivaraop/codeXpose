"""Views file for Interview App."""
import requests

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import list_route

from .models import Question, User, Test, CandidateTestMapping
from .serializers import QuestionSerializers, UserSerializers, TestSerializers
from .permissions import UserViewSetPermission, QuestionViewSetPermission, \
    TestViewSetPermission

TOKEN_GET_ENDPOINT = 'http://localhost:8000/api-token-auth/'


class QuestionViewSet(viewsets.ModelViewSet):
    """
    Question view set to create, retrieve, update and delete the question
    object.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializers
    permission_classes = (QuestionViewSetPermission, )


class UserViewSet(viewsets.ModelViewSet):
    """
    User view set to create, login, retrieve, update and delete the question
    object.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = (UserViewSetPermission, )

    @list_route(methods=['post'], permission_classes=(),)
    def login(self, request):
        """
        login for any valid user.
        return: token if user is valid, Bad request otherwise
        """
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        if email is None and password is None:
            return Response(
                data="Please enter a valid email address and password",
                status=status.HTTP_400_BAD_REQUEST)
        data = {'email': email, 'password': password}
        resp = requests.post(url=TOKEN_GET_ENDPOINT, data=data)
        if resp.status_code != 200:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(resp.text, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """create the user and put user test mapping in database."""
        if request.data.get('user_type', None) == "CANDIDATE":
            test_id = request.data.get('test_id', None)
            if test_id is None:
                return Response(
                    data="Please select a test",
                    status=status.HTTP_400_BAD_REQUEST
                )
            resp = super(UserViewSet, self).create(request, *args, **kwargs)
            user_id = resp.data.get('id', None)
            # TODO : put entry in UserTestMapping db
            user_instance = User.objects.get(id=user_id)
            test_instance = Test.objects.get(id=test_id)
            _ = CandidateTestMapping.objects.create(user=user_instance,
                                                    test=test_instance)
            return resp
        else:
            resp = super(UserViewSet, self).create(request, *args, **kwargs)
            return resp


class TestViewSet(viewsets.ModelViewSet):
    """
    Test view set to create, retrieve, update and delete the test
    object.
    """
    queryset = Test.objects.all()
    serializer_class = TestSerializers
    permission_classes = (TestViewSetPermission, )

    def perform_create(self, serializer):
        """To populate the created_by field by current logged in user."""
        serializer.save(created_by=self.request.user)
