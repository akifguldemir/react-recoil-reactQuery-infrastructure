import React from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

export default function ProtectedComponent() {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery('userData', () => UserService.getUser());

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    const result = logout();
    if (result) navigate('/login');
  };

  return (
    <div>
      <h1>Protected Component</h1>
      <p>This is a protected component.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};