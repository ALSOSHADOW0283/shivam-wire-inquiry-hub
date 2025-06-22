
import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simple authentication logic - in real app, this would validate against backend
    if (email && password) {
      setIsAuthenticated(true);
      console.log(`Login successful for: ${email}`);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log('User logged out');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
};

export default Index;
