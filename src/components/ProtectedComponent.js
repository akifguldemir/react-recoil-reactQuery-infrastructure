import React from 'react';

const ProtectedComponent = () => {
  return (
    <div>
      <h1>Protected Component</h1>
      <p>This is a protected route. Only authenticated users can see this.</p>
    </div>
  );
};

export default ProtectedComponent;