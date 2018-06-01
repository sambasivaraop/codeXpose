"""The module contains test cases for the managers module"""

import configparser
from django.test import TestCase
from interview.models import User

CONFIG_PATH = "interview/tests/config.ini"


class ManagerTestCase(TestCase):
    """The class contains test cases for Manager Module."""

    def setUp(self):
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_PATH)
        self.superuser = User.objects.\
            create_superuser(self.config['superuser']['email'],
                             self.config['superuser']['password'])

    def test_create_superuser(self):
        """Method to test create super user."""
        self.assertEqual(self.superuser.email,
                         self.config['superuser']['email'])
        self.assertTrue(self.superuser.is_staff)

    def tearDown(self):
        del self.superuser
        del self.config
