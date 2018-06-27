"""Testcases for Serializers."""
import configparser
from rest_framework.test import APITestCase

from interview.models import Question
from interview.models import Test
from interview.models import User

from interview.serializers import QuestionSerializers
from interview.serializers import TestSerializers
from interview.serializers import UserSerializers

CONFIG_PATH = "interview/tests/test_config.ini"


class QuestionSerializerTest(APITestCase):
    """ Test class for Question serializers. """
    def setUp(self):
        """ setUp method for QuestionSerializerTest class. """
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_PATH)
        self.question_attributes = {
            'id': self.config['questionSerializer']['id'],
            'title': self.config['questionSerializer']['title'],
            'question_type': self.config['questionSerializer']
                             ['question_type'],
            'marks': self.config['questionSerializer']['marks']
        }
        self.serializer_data = {
            'id': self.config['questionSerializer']['id'],
            'title': self.config['questionSerializer']['title'],
            'question_type': self.config['questionSerializer'][
                'question_type'],
            'marks': self.config['questionSerializer']['marks']
        }

        self.question = Question.objects.create(**self.question_attributes)
        self.serializer = QuestionSerializers(instance=self.question)

    def test_contains_expected_field(self):
        """ To test expected fields. """
        data = self.serializer.data
        self.assertEqual(sorted(list(data.keys())), sorted(
            ['title',
             'question_type',
             'marks', 'id',
             'problem_statement',
             'skeleton',
             'test_cases',
             'difficulty',
             'created_at',
             'modified_at']))

    def test_title_field_content(self):
        """ To test title field content. """
        data = self.serializer.data
        self.assertEqual(data['title'], self.question_attributes['title'])

    def test_questiontype_field_content(self):
        """ To test question type field content. """
        data = self.serializer.data
        self.assertEqual(data['question_type'], self.question_attributes[
            'question_type'])

    def test_marks_field_content(self):
        """ To test marks field content. """
        data = self.serializer.data
        self.assertEqual(data['marks'], int(self.question_attributes['marks']))

    def test_question_id_field_content(self):
        """ To test question id field content. """
        data = self.serializer.data
        self.assertEqual(data['id'], int(self.question_attributes[
            'id']))

    def test_default_field_content(self):
        """ To test fields' default values. """
        data = self.serializer.data
        self.assertEqual(data['test_cases'], None)
        self.assertEqual(data['skeleton'], None)
        self.assertEqual(data['problem_statement'], None)
        self.assertEqual(data['difficulty'], 'EASY')


class UserSerializerTest(APITestCase):
    """ Test class for User serializers. """
    def setUp(self):
        """ setUp method for UserSerializerTest class. """
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_PATH)
        self.user_attributes = {
            'first_name': self.config['user']['first_name'],
            'last_name': self.config['user']['last_name'],
            'email': self.config['user']['email'],
            'password': self.config['user']['password'],
            'user_type': self.config['user']['user_type']
        }

        self.user = User.objects.create(**self.user_attributes)
        self.serializer = UserSerializers(instance=self.user)

    def test_contains_expected_fields(self):
        """ To test expected fields. """
        data = self.serializer.data
        self.assertEqual(sorted(list(data.keys())), sorted(['last_name',
                                                            'first_name',
                                                            'email',
                                                            'user_type',
                                                            'password', 'id',
                                                            'is_staff',
                                                            'last_login',
                                                            'created_at',
                                                            'modified_at']))

    def test_first_name_content(self):
        """ To test first name field content. """
        data = self.serializer.data
        self.assertEqual(data['first_name'], self.user_attributes[
            'first_name'])

    def test_last_name_content(self):
        """ To test last name field content. """
        data = self.serializer.data
        self.assertEqual(data['last_name'], self.user_attributes['last_name'])

    def test_email_content(self):
        """ To test email field content. """
        data = self.serializer.data
        self.assertEqual(data['email'], self.user_attributes['email'])

    def test_user_type_content(self):
        """ To test user type field content. """
        data = self.serializer.data
        self.assertEqual(data['user_type'], self.user_attributes['user_type'])

    def test_password_content(self):
        """ To test password field content. """
        data = self.serializer.data
        self.assertEqual(data['password'], self.user_attributes['password'])


class TestSerializerTest(APITestCase):
    """ Test class for Test serializers. """
    def setUp(self):
        """ setUp method for TestSerializerTest class. """
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_PATH)
        self.test_attributes = {
            'title': self.config['test']['title'],
            'test_type': self.config['test']['test_type']
        }

        self.test = Test.objects.create(**self.test_attributes)
        self.serializer = TestSerializers(instance=self.test)

    def test_contains_expected_fields(self):
        """ To test expected fields. """
        data = self.serializer.data
        self.assertEqual(sorted(list(data.keys())), sorted(['title',
                                                            'test_type',
                                                            'created_by', 'id',
                                                            'duration',
                                                            'question',
                                                            'difficulty',
                                                            'created_at',
                                                            'modified_at']))

    def test_title_content(self):
        """ To test title field content. """
        data = self.serializer.data
        self.assertEqual(data['title'], self.test_attributes['title'])

    def test_test_type_content(self):
        """ To test test-type filed content. """
        data = self.serializer.data
        self.assertEqual(data['test_type'], self.test_attributes['test_type'])
