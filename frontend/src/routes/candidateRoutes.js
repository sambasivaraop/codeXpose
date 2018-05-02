import TestGuideline from "../screens/testGuidelines";
import Test from "../screens/test";
import Question from "../screens/question";

export const candidateRoutes = [
  { path: "/guidelines", component: TestGuideline },
  { path: "/test", component: Test },
  { path: "/question/:id", component: Question }
];
