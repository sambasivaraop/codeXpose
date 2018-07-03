import TestGuideline from "../screens/testGuidelines";
import Test from "../screens/test";
import Question from "../screens/question";
import CandidateHome from "../screens/candidateHome";

export const candidateRoutes = [
  { path: "/guidelines", component: TestGuideline },
  { path: "/test", component: Test },
  { path: "/question/:id", component: Question },
  { path: "/home/", component: CandidateHome }
];
