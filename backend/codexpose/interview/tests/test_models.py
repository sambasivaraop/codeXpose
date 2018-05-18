"""The module contains all the test cases for the project"""

from datetime import datetime
from django.test import TestCase
from django.core.files import File
from ..models import User, Question, Test, CandidateTestMapping, \
    CandidateResult, CandidateSolution

PATH = "interview/tests/test.txt"


class CodexposeModelTestCase(TestCase):
    """The class contains test cases for hrbot."""

    @classmethod
    def setUpClass(cls):
        """setUpClass is used instead of setUp
        to avoid multiple creation of objects."""
        cls.user_obj = User.objects.create(
            first_name='akshat',
            last_name='goel',
            email='test.abc@xyz.com',
            user_type='INTERVIEWER'
        )
        cls.ques_obj = Question.objects.create(
            question_id=1,
            title='Python',
            question_type='Python',
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
        cls.test_obj = Test.objects.create(
            title='Python Test',
            created_by=cls.user_obj
        )
        cls.test_obj.question.add(cls.ques_obj)

        cls.candidate_test_mapping_obj = CandidateTestMapping.objects.create(
            candidate=cls.user_obj,
            test=cls.test_obj,
            schedule=datetime.now()
        )
        cls.candidate_result = CandidateResult.objects.get(
            candidate_test_mapping=cls.candidate_test_mapping_obj
        )
        cls.candidate_solution = CandidateSolution.objects.create(
            candidate_result=cls.candidate_result,
            question=cls.ques_obj
        )

    @classmethod
    def tearDownClass(cls):
        """tearDownClass is used instead of tearDown
        to avoid multiple deletion of objects."""
        del cls.user_obj
        del cls.ques_obj
        del cls.test_obj
        del cls.candidate_test_mapping_obj
        del cls.candidate_result
        del cls.candidate_solution

    def test_user(self):
        """Test case for User model"""

        self.assertTrue(isinstance(self.user_obj, User), 'User Object')
        self.assertEqual(self.user_obj.__str__(), self.user_obj.email)

    def test_question(self):
        """Test case for Question model"""

        self.assertTrue(isinstance(self.ques_obj, Question), 'Question Object')
        self.assertEqual(self.ques_obj.__str__(), self.ques_obj.title)

    def test_test(self):
        """Test case for Test model"""

        self.assertTrue(isinstance(self.test_obj, Test), 'Test Object')
        self.assertEqual(self.test_obj.__str__(), self.test_obj.title)

    def test_candidate_test_mapping(self):
        """Test case for CandidateTestMapping model"""

        self.assertTrue(isinstance(
            self.candidate_test_mapping_obj,
            CandidateTestMapping), 'Candidate Test Mapping Object')
        self.assertEqual(
            self.candidate_test_mapping_obj.__str__(),
            self.user_obj.email + " : " + self.test_obj.title)

    def test_candidate_result(self):
        """Test case for Candidate Result model"""

        self.assertTrue(isinstance(
            self.candidate_result,
            CandidateResult), 'Candidate Result Object')
        self.assertEqual(
            self.candidate_result.__str__(),
            self.candidate_test_mapping_obj.__str__())

    def test_candidate_solution(self):
        """Test case CandidateSolution model"""

        self.assertTrue(isinstance(
            self.candidate_solution,
            CandidateSolution), 'Candidate Solution Object')
