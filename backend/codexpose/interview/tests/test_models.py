"""The module contains all the test cases for the project"""

import configparser
from datetime import datetime
from django.test import TestCase
from django.core.files import File
from ..models import User, Question, Test, CandidateTestMapping, \
    CandidateResult, CandidateSolution, candidate_solution_data_path

PATH = "interview/tests/test.txt"
CONFIG_PATH = "interview/tests/test_config.ini"


class ModelTestCase(TestCase):
    """The class contains test cases for hrbot."""

    def setUp(self):
        """setUp is used instead for creation of objects."""
        # Class method is getting skipped in the execution.
        # Hence changed to instance method.
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_PATH)
        self.user_obj = User.objects.create(
            first_name=self.config['user']['first_name'],
            last_name=self.config['user']['last_name'],
            email=self.config['user']['email'],
            user_type=self.config['user']['user_type']
        )
        self.ques_obj = Question.objects.create(
            title=self.config['question']['title'],
            question_type=self.config['question']['question_type'],
            problem_statement=File(
                open(PATH)
            ),
            test_cases=File(
                open(PATH)
            ),
            skeleton=File(
                open(PATH)
            ),
            marks=10
        )
        self.test_obj = Test.objects.create(
            title=self.config['test']['title'],
            created_by=self.user_obj
        )
        self.test_obj.question.add(self.ques_obj)

        self.candidate_test_mapping_obj = CandidateTestMapping.objects.create(
            candidate=self.user_obj,
            test=self.test_obj,
            schedule=datetime.now()
        )
        self.candidate_result = CandidateResult.objects.get(
            candidate_test_mapping=self.candidate_test_mapping_obj
        )
        self.candidate_solution = CandidateSolution.objects.create(
            candidate_result=self.candidate_result,
            question=self.ques_obj
        )

    def tearDown(self):
        """tearDown is used for deletion of objects."""
        # Class method is getting skipped in the execution.
        # Hence changed to instance method.
        del self.config
        del self.user_obj
        del self.ques_obj
        del self.test_obj
        del self.candidate_test_mapping_obj
        del self.candidate_result
        del self.candidate_solution

    def test_user(self):
        """Test case for User model."""
        self.assertTrue(isinstance(self.user_obj, User), 'User Object')
        self.assertEqual(self.user_obj.__str__(), self.user_obj.email)
        self.assertTrue(self.user_obj.has_perm('edit'))
        self.assertTrue(self.user_obj.has_module_perms('interview'))

    def test_question(self):
        """Test case for Question model."""

        self.assertTrue(isinstance(self.ques_obj, Question), 'Question Object')
        self.assertEqual(self.ques_obj.__str__(), self.ques_obj.title)

    def test_test(self):
        """Test case for Test model."""

        self.assertTrue(isinstance(self.test_obj, Test), 'Test Object')
        self.assertEqual(self.test_obj.__str__(), self.test_obj.title)

    def test_candidate_test_mapping(self):
        """Test case for CandidateTestMapping model."""

        self.assertTrue(isinstance(
            self.candidate_test_mapping_obj,
            CandidateTestMapping), 'Candidate Test Mapping Object')
        self.assertEqual(
            self.candidate_test_mapping_obj.__str__(),
            self.user_obj.email + " : " + self.test_obj.title)

    def test_candidate_result(self):
        """Test case for Candidate Result model."""

        self.assertTrue(isinstance(
            self.candidate_result,
            CandidateResult), 'Candidate Result Object')
        self.assertEqual(
            self.candidate_result.__str__(),
            self.candidate_test_mapping_obj.__str__())

    def test_candidate_solution(self):
        """Test case CandidateSolution model."""

        self.assertTrue(isinstance(
            self.candidate_solution,
            CandidateSolution), 'Candidate Solution Object')

    def test_solution_data_path(self):
        """Test case candidate solution data path."""
        self.assertEqual(
            candidate_solution_data_path(self.candidate_solution, "test.txt"),
            'ct_{0}/question_{1}/test.txt'.format(
                self.candidate_solution
                .candidate_result.candidate_test_mapping.id,
                self.candidate_solution.question.id))
