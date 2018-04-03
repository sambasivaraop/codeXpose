import { questionRoutes } from "./questionRoutes";
import { testRoutes } from "./testRoutes";
import { authRoutes as _authRoutes } from "./authRoutes";
import { candidateRoutes } from "./candidateRoutes";

export const appRoutes = [...candidateRoutes, ...questionRoutes, ...testRoutes];

export const authRoutes = _authRoutes;
