import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/Login/login";
import Home from "./pages/home/home";
import ProtectedComponent from "./pages/protectedComponent/protectedComponent";
import { authAtom } from './recoil/atoms/authAtom';
import { useRecoilValue } from 'recoil';

const Layout = () => {
  const authState = useRecoilValue(authAtom);
  if (authState.isAuthenticated) {
    return (
        <Outlet />
    );
  } else {
    return <Login />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/protected",
        element: <ProtectedComponent />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
export default AppRoutes;