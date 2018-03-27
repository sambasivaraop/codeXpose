import { questionRoutes } from './questionRoutes';
import { testRoutes } from './testRoutes';
import { authRoutes as _authRoutes } from './authRoutes';

export const appRoutes = [
    ...questionRoutes,
    ...testRoutes
]

export const authRoutes = _authRoutes;