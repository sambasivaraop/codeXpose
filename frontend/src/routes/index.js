import { questionRoutes } from "./questionRoutes";
import { testRoutes } from "./testRoutes";
import { authRoutes as _authRoutes } from "./authRoutes";
import { candidateRoutes } from "./candidateRoutes";
import { interviewerRoutes } from "./interviewerRoutes";

export const appRoutes = [
  ...candidateRoutes,
  ...questionRoutes,
  ...testRoutes,
  ...interviewerRoutes
];

export const authRoutes = _authRoutes;
