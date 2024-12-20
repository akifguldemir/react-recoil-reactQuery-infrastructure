import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <Spinner animation="border" role="status" variant="primary">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
};

export default LoadingScreen;