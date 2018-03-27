import Login from '../screens/login';
import { Logout } from '../screens/logout';
import { ChangePassword } from '../screens/changePassword';

export const authRoutes = [
    {path: '/', component: Login},
    {path: '/login', component: Login},
    {path: '/logout', component: Logout},
    {path: '/change_password', component: ChangePassword}
];