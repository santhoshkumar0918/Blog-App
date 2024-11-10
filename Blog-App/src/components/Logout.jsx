// components/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication (e.g., remove token or user data)
    localStorage.removeItem('auth_token');
    navigate('/login'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
