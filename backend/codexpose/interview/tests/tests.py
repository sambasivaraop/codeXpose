"""Testcases for Interviews."""
import configparser
from datetime import datetime
from rest_framework.test import APITestCase

from interview.factories import QuestionFactory
from interview.models import CandidateTestMapping
from interview.models import Test
from interview.models import User

CONFIG_PATH = "interview/tests/config.ini"


class UserViewSetTest(APITestCase):
    """ Test class for testing UserViewSet APIs."""

    def setUp(self):
        """Method to prepare setup for every test."""
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_PATH)
        self.user = User.objects.create_user(
            email=self.config['login']['email'],
            password=self.config['login']['password'])

    def test_user_creation(self):
        """ To test user create API."""
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        self.assertNotEqual(User.objects.count(), 2)
        response = self.client.post('/interview/user/',
                                    {'email': self.config['userPostData'][
                                        'email'],
                                     'password':
                                         self.config['userPostData'][
                                             'password']})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(response.data['email'],
                         self.config['userPostData']['email'])
        self.assertNotEqual(response.data['password'], self.config[
            'userPostData']['password'])

    def test_user_get(self):
        """To test user get API."""
        user_count = User.objects.count()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.get('/interview/user/')
        self.assertEqual(user_count, len(response.data))
        self.assertEqual(response.status_code, 200)

    def test_user_retrieve(self):
        """To test user retrieve API."""
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/user/',
                                    {'email': self.config['userPostData'][
                                        'email'],
                                     'password': self.config['userPostData'][
                                         'password']})
        user_id = response.data['id']
        response = self.client.get('/interview/user/%s/' % user_id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], self.config['userPostData'][
            'email'])

    def test_user_type_default(self):
        """To test default user type."""
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/user/',
                                    {'email': self.config['userPostData'][
                                        'email'],
                                     'password': self.config['userPostData'][
                                         'password']})
        user_id = response.data['id']
        response = self.client.get('/interview/user/%s/' % user_id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user_type'], self.config[
            'userPostData']['interviewer'])

    def test_user_type_interviewer(self):
        """To test interviewer user type."""
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/user/',
                                    {'email': self.config['userPostData'][
                                        'email'],
                                     'password': self.config['userPostData'][
                                         'password'],
                                     'user_type': self.config['userPostData'][
                                         'interviewer']})
        user_id = response.data['id']
        response = self.client.get('/interview/user/%s/' % user_id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user_type'], self.config[
            'userPostData']['interviewer'])

    def test_candidate_without_testid(self):
        """To test candidate user type with no test."""
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/user/',
                                    {'email': self.config['userPostData'][
                                        'email'],
                                     'password': self.config[
                                         'userPostData']['password'],
                                     'user_type': self.config[
                                         'userPostData']['candidate']})
        self.assertEqual(response.status_code, 201)

    def test_candidate_with_testid(self):
        """To test candidate user type with test."""
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        question_object = QuestionFactory.build()
        _ = self.client.post('/interview/test/', {'title': self.config[
            'testPostData']['title'], 'duration': self.config['testPostData'][
                'duration'], 'question': question_object})
        test_id = _.data['id']
        response = self.client.post('/interview/user/',
                                    {'email': self.config['userPostData'][
                                        'email'],
                                     'password': self.config[
                                         'userPostData']['password'],
                                     'user_type': self.config['userPostData'][
                                         'candidate'], 'test': test_id,
                                     'schedule': datetime.now()})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(CandidateTestMapping.objects.count(), 1)

    def test_user_delete(self):
        """To test user delete API."""
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/user/',
                                    {'email': self.config['userPostData'][
                                        'email'],
                                     'password': self.config[
                                         'userPostData']['password']})
        user_id = response.data['id']
        self.assertEqual(User.objects.count(), 2)
        response = self.client.delete('/interview/user/%s/' % user_id)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(User.objects.count(), 1)


class TestViewSetTest(APITestCase):
    """Test class for testing TestViewSet APIs."""

    def setUp(self):
        """Method to prepare setup for every test"""
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_PATH)
        self.user = User.objects.create_user(
            email=self.config['login']['email'],
            password=self.config['login']['password'])
        self.another_user = User.objects.create_user(
            email=self.config['login']['another_email'],
            password=self.config['login']['another_password'])

    def test_test_creation(self):
        """testing create API of test."""
        question_object = QuestionFactory.build()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        self.assertEqual(Test.objects.count(), 0)
        response = self.client.post('/interview/test/',
                                    {'title': self.config['testPostData'][
                                        'title'],
                                     'duration': self.config['testPostData'][
                                         'duration'],
                                     'question': question_object})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Test.objects.count(), 1)

    def test_test_get_owner_user(self):
        """testing get API of test."""
        question_object = QuestionFactory.build()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        _ = self.client.post('/interview/test/',
                             {'title': self.config['testPostData']['title'],
                              'duration': self.config['testPostData'][
                                  'duration'],
                              'question': question_object})
        response = self.client.get('/interview/test/')
        self.assertEqual(response.status_code, 200)

    def test_test_retrieve_owner_user(self):
        """testing retrieval of test."""
        question_object = QuestionFactory.build()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/test/',
                                    {'title': self.config['testPostData'][
                                        'title'],
                                     'duration': self.config['testPostData'][
                                         'duration'],
                                     'question': question_object})
        test_id = response.data['id']
        response = self.client.get('/interview/test/%s/' % test_id)
        self.assertEqual(response.data['title'], self.config[
            'testPostData']['title'])
        self.assertEqual(response.status_code, 200)

    def test_test_update_owner_user(self):
        """testing update API of test."""
        question_object = QuestionFactory.build()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/test/',
                                    {'title': self.config['testPostData'][
                                        'title'],
                                     'duration': self.config['testPostData'][
                                         'duration'],
                                     'question': question_object})
        test_id = response.data['id']
        response = self.client.put('/interview/test/%s/' % test_id,
                                   {'title': self.config['testPostData'][
                                       'title_change'],
                                    'duration': self.config['testPostData'][
                                        'duration'],
                                    'question': question_object})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/interview/test/%s/' % test_id)
        self.assertEqual(response.data['title'],
                         self.config['testPostData']['title_change'])
        self.assertEqual(response.status_code, 200)

    def test_test_delete_owner_user(self):
        """testing delete API of test."""
        question_object = QuestionFactory.build()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/test/',
                                    {'title': self.config['testPostData'][
                                        'title'],
                                     'duration': self.config['testPostData'][
                                         'duration'],
                                     'question': question_object})
        test_id = response.data['id']
        response = self.client.delete('/interview/test/%s/' % test_id)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Test.objects.count(), 0)

    def test_test_get_another_user(self):
        """testing get API of test using another user."""
        question_object = QuestionFactory.build()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        _ = self.client.post('/interview/test/',
                             {'title': self.config['testPostData']['title'],
                              'duration': self.config['testPostData'][
                                  'duration'],
                              'question': question_object})
        self.client.login(email=self.config['login']['another_email'],
                          password=self.config['login']['another_password'])
        response = self.client.get('/interview/test/')
        self.assertEqual(response.status_code, 200)

    def test_test_retrieve_another_user(self):
        """testing retrieval of test using another user."""
        question_object = QuestionFactory.build()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/test/',
                                    {'title': self.config['testPostData'][
                                        'title'],
                                     'duration': self.config[
                                         'testPostData']['duration'],
                                     'question':
                                         question_object})
        test_id = response.data['id']
        self.client.login(email=self.config['login']['another_email'],
                          password=self.config['login']['another_password'])
        response = self.client.get('/interview/test/%s/' % test_id)
        self.assertEqual(response.data['title'], self.config[
            'testPostData']['title'])
        self.assertEqual(response.status_code, 200)

    def test_test_update_another_user(self):
        """testing update API of test using another user."""
        question_object = QuestionFactory.build()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/test/',
                                    {'title': self.config['testPostData'][
                                        'title'],
                                     'duration': self.config[
                                         'testPostData']['duration'],
                                     'question': question_object})
        test_id = response.data['id']
        self.client.login(email=self.config['login']['another_email'],
                          password=self.config['login']['another_password'])
        response = self.client.put('/interview/test/%s/' % test_id,
                                   {'title': self.config['testPostData'][
                                       'title_change'],
                                    'duration': self.config['testPostData'][
                                        'duration'],
                                    'question': question_object})
        self.assertEqual(response.status_code, 403)

    def test_test_delete_another_user(self):
        """testing delete API of test using another user."""
        question_object = QuestionFactory.build()
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        response = self.client.post('/interview/test/',
                                    {'title': self.config['testPostData'][
                                        'title'],
                                     'duration': self.config['testPostData'][
                                         'duration'],
                                     'question':
                                         question_object})
        test_id = response.data['id']
        self.client.login(email=self.config['login']['another_email'],
                          password=self.config['login']['another_password'])
        response = self.client.delete('/interview/test/%s/' % test_id)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Test.objects.count(), 1)


class QuestionViewSetTest(APITestCase):
    """Test class for testing QuestionViewSet APIs."""

    def setUp(self):
        """Method to prepare setup for every test"""
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_PATH)
        self.user = User.objects.create_user(
            email=self.config['login']['email'],
            password=self.config['login']['password'])

    def test_question_creation(self):
        """To test question create API."""
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        with open('interview/tests/file1.py') as fp1, \
                open('interview/tests/file2.py') as fp2, \
                open('interview/tests/file3.py') as fp3:
            response = self.client.post('/interview/question/',
                                        {'title': self.config[
                                            'questionPostData']['title'],
                                         'question_id': self.config[
                                             'questionPostData'][
                                                 'question_id'],
                                         'question_type': self.config[
                                             'questionPostData'][
                                                 'question_type'],
                                         'problem_statement': fp1,
                                         'test_cases': fp2,
                                         'skeleton': fp3, 'marks': self.config[
                                             'questionPostData']['marks']})
        self.assertEqual(response.status_code, 201)

    def test_question_retrieve(self):
        """To test user retrieve API."""
        self.client.login(email=self.config['login']['email'],
                          password=self.config['login']['password'])
        with open('interview/tests/file1.py') as fp1, \
                open('interview/tests/file2.py') as fp2, \
                open('interview/tests/file3.py') as fp3:
            response = self.client.post('/interview/question/',
                                        {'title': self.config[
                                            'questionPostData']['title'],
                                         'question_id': self.config[
                                             'questionPostData'][
                                                 'question_id'],
                                         'question_type': self.config[
                                             'questionPostData'][
                                                 'question_type'],
                                         'problem_statement': fp1,
                                         'test_cases': fp2,
                                         'skeleton': fp3, 'marks': self.config[
                                             'questionPostData']['marks']})
        self.assertEqual(response.status_code, 201)

        question_id = response.data['id']
        response = self.client.get('/interview/question/%s/' % question_id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], self.config[
            'questionPostData']['title'])
