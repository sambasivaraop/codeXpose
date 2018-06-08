import CreateUser from "../screens/createUser";
import CreateTest from "../screens/createTest";
import ViewUsers from "../screens/viewUsers";
import ViewTests from "../screens/viewTests";
import ViewQuestions from "../screens/viewQuestions";

export const interviewerRoutes = [
  { path: "/create_user/", component: CreateUser },
  { path: "/create_test/", component: CreateTest },
  { path: "/view_users/", component: ViewUsers },
  { path: "/view_tests/", component: ViewTests },
  { path: "/view_questions/", component: ViewQuestions }
];
