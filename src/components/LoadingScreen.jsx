import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader-container">
        <div className="loader-ring"></div>
        <div className="loader-pulse"></div>
      </div>
      <div className="loader-text">EcoReward</div>
    </div>
  );
};

export default LoadingScreen;
