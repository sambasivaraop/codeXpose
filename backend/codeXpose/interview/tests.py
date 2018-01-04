from django.test import TestCase
from rest_framework.test import APITestCase
from . views import UserViewSet
from .factories import TestFactory
from .models import User


class UserViewSetTest(APITestCase):
    """ Test class for testing UserViewSet APIs."""
    def setUp(self):
        self.user = User.objects.create_user(email='testuser@example.com',
                                             password='test12345')

    def test_user_creation(self):
        """ To test user create API."""
        self.client.login(email='testuser@example.com', password='test12345')
        response = self.client.post('/interview/user/',
                                 {'email':'test@example.com',
                                  'password':'test12345'})
        self.assertEqual(response.status_code, 201)

    def test_user_get(self):
        """To test user get API."""
        user = TestFactory.build()
        self.client.login(email='testuser@example.com', password='test12345')
        response = self.client.get('/interview/user/')
        self.assertEqual(response.status_code, 200)
