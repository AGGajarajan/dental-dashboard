// src/pages/PatientView.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../styles/PatientView.css';

const PatientView = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();  // Initialize navigate
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    if (db) {
      const pat = db.patients.find(p => p.id === user.patientId);
      setPatient(pat);
      const myIncidents = db.incidents.filter(i => i.patientId === user.patientId);
      setIncidents(myIncidents);
    }
  }, [user]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="patient-view-container">
      <header>
        <h2>Welcome, {patient.name}</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <section className="patient-info">
        <h3>Your Info</h3>
        <p><strong>DOB:</strong> {patient.dob}</p>
        <p><strong>Contact:</strong> {patient.contact}</p>
        <p><strong>Health Info:</strong> {patient.healthInfo}</p>
      </section>

      <section className="appointments">
        <h3>Your Appointments</h3>
        {incidents.length === 0 && <p>No appointments found.</p>}
        <ul>
          {incidents.map(i => (
            <li key={i.id}>
              <strong>{i.title}</strong> on {new Date(i.appointmentDate).toLocaleString()}<br />
              Status: {i.status || 'Pending'}<br />
              Treatment Cost: {i.cost ? `$${i.cost}` : 'N/A'}<br />
              Treatment Files: 
              <ul>
                {i.files && i.files.length > 0 ? (
                  i.files.map(f => (
                    <li key={f.name}>
                      <a href={f.url} target="_blank" rel="noreferrer">{f.name}</a>
                    </li>
                  ))
                ) : 'No files'}
              </ul>
            </li>
          ))}
        </ul>
      </section><br />
      
      <button className="add-button" onClick={() => navigate('/')}>
        ⬅ Back to Dashboard
      </button><br />
    </div>
  );
};

export default PatientView;
