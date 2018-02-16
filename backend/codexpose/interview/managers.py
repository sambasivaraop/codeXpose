"""Manager class implementation to create Custom Auth User."""
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    """
    User manager class to handle the creation of users.
    """
    use_in_migrations = True

    def _create_user(self, email, password):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None):
        """
        Create and save a User with given email and password.
        :param email: user's valid email address
        :param password: password
        :return: User instance
        """
        user = self._create_user(email, password)
        if user.user_type == "CANDIDATE":
            user.is_staff = False
            user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Create and save a Superuser with given email and password.
        :param email: superuser's valid email address
        :param password: password
        :return: user instance
        """
        user = self._create_user(email, password)
        user.is_staff = True
        user.save(using=self._db)
        return user
