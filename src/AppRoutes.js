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
  const storedAuthState = localStorage.getItem('authState');

  if (!storedAuthState) {
    return <Routes><Route key={'/login'} path={'/login'} element={<Navigate to="/login" />} /></Routes>;
  }
  
  return (
    <Routes>
      {routes.map((route) => {
        const Element = withNavigationWatcher(route.element, route.path);
        return <Route key={route.path} path={route.path} element={<Element />} />;
      })}
    </Routes>
  );
};

export default AppRoutes;