import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../recoil/atoms/authAtom';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useRecoilState(authAtom);
  const history = useHistory();

  const handleLogin = () => {
    // Simulate authentication
    if (username === 'user' && password === 'password') {
      setAuth({ isAuthenticated: true });
      history.push('/protected');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;