import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedComponent from './components/ProtectedComponent';
import { authAtom } from './recoil/atoms/authAtom';

const queryClient = new QueryClient();

const App = () => {
  const authState = useRecoilValue(authAtom);
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            {authState.isAuthenticated ? (
              <>
                <Route path="/" exact component={Home} />
                <ProtectedRoute path="/protected" component={ProtectedComponent} />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Switch>
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;