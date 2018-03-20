"""The module contains all the test cases for the project"""

import os
from datetime import datetime
from django.test import TestCase
from django.core.files import File
from ..models import User, Question, Test, CandidateTestMapping, \
    CandidateResult, CandidateSolution


class CodexposeModelTestCase(TestCase):
    """The class contains test cases for hrbot"""

    def setUp(self):
        self.path = os.path.abspath("../../../files/test.txt")

        self.user_obj = User.objects.create(
            first_name='akshat',
            last_name='goel',
            email='test.abc@xyz.com',
            user_type='INTERVIEWER'
        )
        self.ques_obj = Question.objects.create(
            question_id=1,
            title='Python',
            question_type='Python',
            problem_statement=File(
                open(self.path)
            ),
            test_cases=File(
                open(self.path)
            ),
            skeleton=File(
                open(self.path)
            ),
            marks=10
        )
        self.test_obj = Test.objects.create(
            title='Python Test',
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
        del self.user_obj
        del self.ques_obj
        del self.test_obj
        del self.candidate_test_mapping_obj
        del self.candidate_result
        del self.candidate_solution

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
