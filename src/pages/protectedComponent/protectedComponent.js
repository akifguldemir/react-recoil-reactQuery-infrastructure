import React from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import { userAtom } from '../../recoil/atoms/userAtom';
import { useRecoilState } from 'recoil';

export default function ProtectedComponent() {
  const [ userState, setUserState ] = useRecoilState(userAtom);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery('userData', () => UserService.getUser(), {
    onSuccess: (data) => {
      setUserState(data.data);
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    const result = logout();
    if (!result.isAuthenticated) navigate('/login');
  };

  return (
    <div>
      <h1>Protected Component</h1>
      <p>{userState.firstName}</p>
      <p>{userState.lastName}</p>
      <p>{userState.age}</p>
      <p>{userState.email}</p>
      <img src={userState.image} alt="User" />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};