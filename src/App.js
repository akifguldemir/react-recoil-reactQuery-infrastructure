import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './AppRoutes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppRoutes />
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;