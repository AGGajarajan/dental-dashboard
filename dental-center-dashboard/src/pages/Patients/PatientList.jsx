// src/pages/Patients/PatientList.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/PatientList.css'; // Assuming you have a CSS file for styling


const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    if (db) {
      setPatients(db.patients);
    }
  }, []);

  const deletePatient = (id) => {
    if(window.confirm('Delete this patient?')) {
      const db = JSON.parse(localStorage.getItem('db'));
      const newPatients = db.patients.filter(p => p.id !== id);
      db.patients = newPatients;
      localStorage.setItem('db', JSON.stringify(db));
      setPatients(newPatients);
    }
  };

  return (
    <div className="patient-list-container">
      <h2>Patients</h2>
      <button onClick={() => navigate('/patients/add')}>Add Patient</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Health Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 && (
            <tr><td colSpan="5">No patients found.</td></tr>
          )}
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.dob}</td>
              <td>{p.contact}</td>
              <td>{p.healthInfo}</td>
              <td>
                <button onClick={() => navigate(`/patients/edit/${p.id}`)}>Edit</button>
                <button onClick={() => deletePatient(p.id)}>Delete</button>
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

export default PatientList;
