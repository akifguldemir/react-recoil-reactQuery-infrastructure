import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserData = async () => {
  const { data } = await axios.get('/api/user');
  return data;
};

const Home = () => {
  const { data, error, isLoading } = useQuery('userData', fetchUserData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {data.name}!</p>
    </div>
  );
};

export default Home;