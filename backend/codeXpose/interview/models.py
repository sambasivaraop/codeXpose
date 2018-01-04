from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager


class User(AbstractBaseUser):
    """Model class for User instance."""
    type_choice = (
        ('INTERVIEWER', 'Interviewer'),
        ('CANDIDATE', 'Candidate'),
    )
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    user_type = models.CharField(max_length=20,
                                 choices=type_choice,
                                 default='INTERVIEWER')
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        """Is the user a member of staff?"""
        return self.is_admin


def question_data_path(instance, filename):
    # question data will be uploaded to MEDIA_ROOT/question_<id>/<filename>
    return 'question_{0}/{1}'.format(instance.question_id, filename)


class Question(models.Model):
    """Model class for Question instance."""
    question_id = models.IntegerField()
    title = models.CharField(max_length=50)
    question_type = models.CharField(max_length=20)
    problem_statement = models.FileField(upload_to=question_data_path)
    test_cases = models.FileField(upload_to=question_data_path)
    skeleton = models.FileField(upload_to=question_data_path)
    marks = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Test(models.Model):
    """Model class for Test instance."""
    type_choice = (
        ('PROGRAMMING', 'Programming'),
        ('MCQ', 'MCQ'),
    )
    title = models.CharField(max_length=50)
    test_type = models.CharField(max_length=20, choices=type_choice,
                                 default='PROGRAMMING')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    duration = models.DurationField(blank=True, null=True)
    question = models.ManyToManyField(Question)

    def __str__(self):
        return self.title


class CandidateTestMapping(models.Model):
    """Model class for mapping of User with Test"""
    candidate = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
