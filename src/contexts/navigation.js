import React from 'react';
import { useLocation } from 'react-router-dom';

export const withNavigationWatcher = (Component, path) => {
  return (props) => {
    const location = useLocation();

    React.useEffect(() => {
      console.log(`Navigated to ${path}`);
    }, [location]);

    return <Component {...props} />;
  };
};