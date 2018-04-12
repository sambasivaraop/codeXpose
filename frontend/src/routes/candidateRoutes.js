import AcceptTest from "../screens/testGuidelines";
import test from "../screens/test";
import Question from "../screens/question";

export const candidateRoutes = [
  { path: "/guidelines", component: AcceptTest },
  { path: "/test", component: test },
  { path: "/question/:id", component: Question }
];
