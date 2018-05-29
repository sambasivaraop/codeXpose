import Login from "../screens/login";
import { Logout } from "../screens/logout";
import { ChangePassword } from "../screens/changePassword";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const authRoutes = [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/change_password", component: ChangePassword },
  { path: "/sidebar", component: Sidebar },
  { path: "/topbar", component: Topbar }
];
