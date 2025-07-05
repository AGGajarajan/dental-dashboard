// src/pages/Patients/EditPatient.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/EditPatient.css"; // Assuming you have a CSS file for styling

const EditPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    const patient = db.patients.find(p => p.id === id);
    if (patient) setFormData(patient);
  }, [id]);

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('db'));
    const index = db.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      db.patients[index] = formData;
      localStorage.setItem('db', JSON.stringify(db));
      navigate('/patients');
    }
  };

  return (
    <div className="add-patient-container">
      <h2>Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
        <textarea name="healthInfo" placeholder="Health Info" value={formData.healthInfo} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/patients')}>Cancel</button>
      </form><br />
      <span>      <button className="add-button" onClick={() => navigate('/')}>
        ⬅ Back to Dashboard
      </button></span>
    </div>
  );
};

export default EditPatient;
