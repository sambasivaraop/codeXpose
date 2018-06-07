import CreateUser from "../screens/createUser";
import CreateTest from "../screens/createTest";
import ViewUsers from "../screens/viewUsers";

export const interviewerRoutes = [
  { path: "/create_user/", component: CreateUser },
  { path: "/create_test/", component: CreateTest },
  { path: "/view_users/", component: ViewUsers }
];
