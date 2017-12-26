from django.db import models


class Test(models.Model):
    test_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    modified_at = models.DateTimeField()

    def __str__(self):
        return self.title


class User(models.Model):
    user_id = models.IntegerField(unique=True)
    test = models.ForeignKey(Test, on_delete=models.SET_NULL, null=True)
    email = models.EmailField()
    password = models.CharField(max_length=20)
    created_at = models.DateTimeField()
    modified_at = models.DateTimeField()


def question_data_path(instance, filename):
    # question data will be uploaded to MEDIA_ROOT/question_<id>/<filename>
    return 'question_{0}/{1}'.format(instance.question_id, filename)


class Question(models.Model):
    question_id = models.IntegerField(unique=True)
    question_type = models.CharField(max_length=20)
    problem_statement = models.FileField(upload_to=question_data_path)
    test_cases = models.FileField(upload_to=question_data_path)
    skeleton = models.FileField(upload_to=question_data_path)
    test = models.ManyToManyField(Test)
    created_at = models.DateTimeField()
    modified_at = models.DateTimeField()