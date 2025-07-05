// src/pages/Incidents/IncidentList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/IncidentList.css"; // Assuming you have a CSS file for styling

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    if (db) {
      setIncidents(db.incidents);
      setPatients(db.patients);
    }
  }, []);

  const deleteIncident = (id) => {
    if(window.confirm('Delete this incident?')) {
      const db = JSON.parse(localStorage.getItem('db'));
      const newIncidents = db.incidents.filter(i => i.id !== id);
      db.incidents = newIncidents;
      localStorage.setItem('db', JSON.stringify(db));
      setIncidents(newIncidents);
    }
  };

  const getPatientName = (pid) => {
    const p = patients.find(p => p.id === pid);
    return p ? p.name : "Unknown";
  };

  return (
    <div className="incident-list-container">
      <h2>Incidents (Appointments)</h2>
      <button onClick={() => navigate('/incidents/add')}>Add Incident</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Patient</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.length === 0 && (
            <tr><td colSpan="6">No incidents found.</td></tr>
          )}
          {incidents.map(i => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>{getPatientName(i.patientId)}</td>
              <td>{new Date(i.appointmentDate).toLocaleString()}</td>
              <td>{i.status || "Pending"}</td>
              <td>{i.cost ? `$${i.cost}` : "-"}</td>
              <td>
                {/* Could add Edit here */}
                <button onClick={() => deleteIncident(i.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table><br />
            <button className="add-button" onClick={() => navigate('/')}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
};

export default IncidentList;
