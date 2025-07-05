// src/components/Header.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css"; // Assuming you have a CSS file for styling

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="logo" onClick={() => navigate('/')}>ENTNT Dental Center</div>
            <nav>
                {user && user.role === 'Admin' && (
                    <>
                        <button onClick={() => navigate('/patients')}>Patients</button>
                        <button onClick={() => navigate('/incidents')}>Incidents</button>
                    </>
                )}
                {user && user.role === 'Patient' && (
                    <button onClick={() => navigate('/mydata')}>My Data</button>
                )}
                {user && (
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                )}
            </nav>
        </header>
    );
}

export default Header;
