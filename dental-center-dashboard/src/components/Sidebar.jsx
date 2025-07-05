// src/components/Sidebar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css'; // Assuming you have a CSS file for styling

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">ENTNT Dashboard</div>
      <nav>
        {user && user.role === 'Admin' && (
          <>
            <button onClick={() => navigate('/')}>Dashboard</button>
            <button onClick={() => navigate('/patients')}>Patients</button>
            <button onClick={() => navigate('/incidents')}>Incidents</button>
          </>
        )}

        {user && user.role === 'Patient' && (
          <>
            <button onClick={() => navigate('/')}>Dashboard</button>
            <button onClick={() => navigate('/mydata')}>My Data</button>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
