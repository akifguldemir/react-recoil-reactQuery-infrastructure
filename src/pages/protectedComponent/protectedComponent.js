import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function ProtectedComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = logout();
    if (result) navigate('/login');

  }
  return (
    <div>
      <h1>Protected Component</h1>
      <p>This is a protected component.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};