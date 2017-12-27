from django.db import models


class Test(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    modified_at = models.DateTimeField()
    duration = models.DurationField(blank=True, null=True)

    def __str__(self):
        return self.title


class User(models.Model):
    type_choice = (
        ('interviewer', 'Interviewer'),
        ('candidate', 'Candidate'),
    )
    email = models.EmailField()
    password = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now_add=True)
    user_type = models.CharField(max_length=20,
                                 choices=type_choice,
                                 default='interviewer')


def question_data_path(instance, filename):
    # question data will be uploaded to MEDIA_ROOT/question_<id>/<filename>
    return 'question_{0}/{1}'.format(instance.question_id, filename)


class Question(models.Model):
    question_type = models.CharField(max_length=20)
    problem_statement = models.FileField(upload_to=question_data_path)
    test_cases = models.FileField(upload_to=question_data_path)
    skeleton = models.FileField(upload_to=question_data_path)
    test = models.ManyToManyField(Test)
    created_at = models.DateTimeField()
    modified_at = models.DateTimeField()


class UserTestMapping(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)