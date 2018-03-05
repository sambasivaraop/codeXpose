"""Models file to define schemas."""
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.db.models.signals import post_save
from django.db.models import Sum
from django.dispatch import receiver

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
    is_staff = models.BooleanField(default=True)

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
        """User permission for App."""
        return True


def question_data_path(instance, filename):
    """Returns Questions data path."""
    # question data will be uploaded to MEDIA_ROOT/question_<id>/<filename>
    return 'question_{0}/{1}'.format(instance.question_id, filename)


class Question(models.Model):
    """Model class for Question instance."""
    difficulty_choice = (
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard')
    )
    question_id = models.IntegerField()
    title = models.CharField(max_length=50)
    question_type = models.CharField(max_length=20)
    problem_statement = models.FileField(upload_to=question_data_path)
    test_cases = models.FileField(upload_to=question_data_path)
    skeleton = models.FileField(upload_to=question_data_path)
    marks = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    difficulty = models.CharField(max_length=10, choices=difficulty_choice,
                                  default='EASY')

    def __str__(self):
        return self.title


class Test(models.Model):
    """Model class for Test instance."""
    type_choice = (
        ('PROGRAMMING', 'Programming'),
        ('MCQ', 'MCQ'),
    )
    difficulty_choice = (
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard')
    )
    title = models.CharField(max_length=50, unique=True)
    test_type = models.CharField(max_length=20, choices=type_choice,
                                 default='PROGRAMMING')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    duration = models.DurationField(blank=True, null=True)
    question = models.ManyToManyField(Question)
    difficulty = models.CharField(max_length=10, choices=difficulty_choice,
                                  default='EASY')

    def __str__(self):
        return self.title


class CandidateTestMapping(models.Model):
    """Model class for mapping of User with Test."""
    candidate = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    schedule = models.DateTimeField()
    is_accepted = models.BooleanField(default=False)

    def __str__(self):
        return self.candidate.email + " : " + self.test.title


class CandidateResult(models.Model):
    """Model class to store final result of a candidate."""

    candidate_test_mapping = models.OneToOneField(CandidateTestMapping,
                                                  on_delete=models.CASCADE)
    scored_marks = models.IntegerField(default=0)
    feedback = models.TextField(blank=True, null=True)
    decision = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return str(self.candidate_test_mapping)


def candidate_solution_data_path(instance, filename):
    """Returns candidate solution data path."""
    return 'ct_{0}/question_{1}/{2}'.format(
        instance.candidate_result.candidate_test_mapping.id,
        instance.question.id, filename)


class CandidateSolution(models.Model):
    """Model class to store final result of a candidate."""

    candidate_result = models.ForeignKey(CandidateResult,
                                         on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    solution = models.FileField(upload_to=candidate_solution_data_path)
    scored_marks = models.IntegerField(default=0)
    feedback = models.TextField(blank=True, null=True)


@receiver(post_save, sender=CandidateSolution)
def save_candidate_result(sender, instance, **kwargs):
    """Method to update scores in CandidateResult model."""
    _sum = instance.candidate_result.candidatesolution_set.aggregate(
        total=Sum('scored_marks')).get('total')

    instance.candidate_result.scored_marks = _sum
    instance.candidate_result.save()


@receiver(post_save, sender=CandidateTestMapping)
def create_candidate_result(sender, instance, created, **kwargs):
    """Method to create entry in CandidateSolution model after assigning
    test  to candidate"""
    if instance and created:
        CandidateResult.objects.create(
            candidate_test_mapping=instance)
