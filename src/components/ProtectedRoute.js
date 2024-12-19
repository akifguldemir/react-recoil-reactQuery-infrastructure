import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../recoil/atoms/authAtom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authState = useRecoilValue(authAtom);

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;