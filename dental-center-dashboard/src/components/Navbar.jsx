// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')}>
        ENTNT Dental Center
      </div>

      <div className="navbar-right">
        {user?.role === 'Admin' && (
          <>
            <button onClick={() => navigate('/')}>Dashboard</button>
            <button onClick={() => navigate('/patients')}>Patients</button>
            <button onClick={() => navigate('/incidents')}>Incidents</button>
            <button onClick={() => navigate('/calendar')}>Calendar</button>
          </>
        )}

        {user?.role === 'Patient' && (
          <>
            <button onClick={() => navigate('/')}>Dashboard</button>
            <button onClick={() => navigate('/mydata')}>My Data</button>
          </>
        )}

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
