import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Login/login";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import PublicPage from "./pages/publicpages/publicPage";
import Header from "./components/Header/Header";

const ProtectedLayout = () => {
  const storedAuthState = localStorage.getItem('authState');

  if (storedAuthState) {
    return (<><Header title='Özyer Portal'/><Outlet /></> );

  } else {
    return <Navigate to="/login" replace />;
  }
};

const PublicLayout = () => {
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/public",
    element: <PublicLayout />,
    children: [
      {
        path: "/public",
        element: <PublicPage />,
      }
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;