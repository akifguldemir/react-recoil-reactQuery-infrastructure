import React from 'react';
import { useRecoilValue } from 'recoil';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, ProtectedComponent } from './pages';
import { withNavigationWatcher } from './contexts/navigation';
import { authAtom } from './recoil/atoms/authAtom';

const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/protected",
    element: ProtectedComponent,
  },
];

const AppRoutes = () => {
  const authState = useRecoilValue(authAtom);

  return (
    <Routes>
      {routes.map((route) => {
        if (route.path === "/protected" && !authState.isAuthenticated) {
          return <Route key={route.path} path={route.path} element={<Navigate to="/login" />} />;
        }
        const Element = withNavigationWatcher(route.element, route.path);
        return <Route key={route.path} path={route.path} element={<Element />} />;
      })}
    </Routes>
  );
};

export default AppRoutes;