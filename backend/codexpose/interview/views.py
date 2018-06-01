"""Views file for Interview App."""
import logging
import requests

from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import list_route

from .models import Question, User, Test, CandidateTestMapping, \
    CandidateResult, CandidateSolution
from .serializers import QuestionSerializers, UserSerializers, \
    TestSerializers, CandidateTestMappingSerializer, \
    CandidateResultSerializer, CandidateSolutionSerializer
from .permissions import UserViewSetPermission, QuestionViewSetPermission, \
    TestViewSetPermission

TOKEN_GET_ENDPOINT = 'http://localhost:8000/api-token-auth/'
LOGGER = logging.getLogger(__name__)


class QuestionViewSet(viewsets.ModelViewSet):
    """
    Question view set to create, retrieve, update and delete the question
    object.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializers
    permission_classes = (QuestionViewSetPermission, )

    def retrieve(self, request, *args, **kwargs):
        """
        Method to retrieve question object.
        This method will return the data stored in question files.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        question_path = settings.MEDIA_ROOT + '/' + '/'.join(
            serializer.data['problem_statement'].split('/')[-2:])
        skeleton_path = settings.MEDIA_ROOT + '/' + '/'.join(
            serializer.data['skeleton'].split('/')[-2:])
        with open(question_path) as question_fp:
            problem_statement = question_fp.read()
        with open(skeleton_path) as skeleton_fp:
            skeleton = skeleton_fp.read()
        data = {'problem_statement': problem_statement, 'function': skeleton,
                'title': serializer.data['title']}
        return Response(data)


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
            LOGGER.error("Either email or password not matched.")
            return Response(
                data="Please enter a valid email address and password",
                status=status.HTTP_400_BAD_REQUEST)
        data = {'email': email, 'password': password}
        resp = requests.post(url=TOKEN_GET_ENDPOINT, data=data)
        if resp.status_code != 200:
            LOGGER.error("Invalid credentials, Login failed!.")
            return Response(data="Invalid Credentials",
                            status=status.HTTP_401_UNAUTHORIZED)
        print(resp.text)
        LOGGER.debug("Login successful.")
        return Response(resp.text, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """create the user and put user test mapping in database."""
        if request.data.get('user_type', None) == "CANDIDATE":
            test_id = request.data.get('test', None)
            if test_id is not None:
                resp = super(UserViewSet, self).create(request, *args,
                                                       **kwargs)
                user_id = resp.data.get('id', None)
                user_instance = User.objects.get(id=user_id)
                test_instance = Test.objects.get(id=test_id)
                _ = CandidateTestMapping.objects.create(
                    candidate=user_instance, test=test_instance,
                    schedule=request.data.get('schedule', None),
                    is_accepted=request.data.get('is_accepted', False))
                LOGGER.debug("Candidate created successfully, associated "
                             "with Test ID %s", test_id)
                return resp
            return super(UserViewSet, self).create(request, *args, **kwargs)
        else:
            resp = super(UserViewSet, self).create(request, *args, **kwargs)
            LOGGER.debug("Interviewer created successfully.")
            return resp

    def perform_create(self, serializer):
        """ To set is_staff flag if user is interviewer"""
        if self.request.data.get('user_type', None) == 'CANDIDATE':
            serializer.save(is_staff=False)
        else:
            serializer.save()


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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        # print(serializer.data)
        for question in serializer.data['question']:
            question_path = settings.MEDIA_ROOT + '/' + '/'.join(
                question['problem_statement'].split('/')[-2:])
            skeleton_path = settings.MEDIA_ROOT + '/' + '/'.join(
                question['skeleton'].split('/')[-2:])
            with open(question_path) as question_fp:
                problem_statement = question_fp.read()
            with open(skeleton_path) as skeleton_fp:
                skeleton = skeleton_fp.read()
            question['problem_statement'] = problem_statement
            question['skeleton'] = skeleton
        return Response(serializer.data)


class CandidateTestMappingViewSet(viewsets.ModelViewSet):
    """
    CandidateTestMapping view set to create, retrieve, update and delete
    mapping object.
    """
    queryset = CandidateTestMapping.objects.all()
    serializer_class = CandidateTestMappingSerializer


class CandidateResultViewSet(viewsets.ModelViewSet):
    """
    CandidateResult view set to create, retrieve, update and delete result
    object.
    """
    queryset = CandidateResult.objects.all()
    serializer_class = CandidateResultSerializer


class CandidateSolutionViewSet(viewsets.ModelViewSet):
    """
    CandidateSolution view set to create, retrieve, update and delete solution
    object.
    """
    queryset = CandidateSolution.objects.all()
    serializer_class = CandidateSolutionSerializer
