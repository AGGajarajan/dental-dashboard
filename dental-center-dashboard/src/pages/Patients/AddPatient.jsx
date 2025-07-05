// src/pages/Patients/AddPatient.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/AddPatient.css"; // Assuming you have a CSS file for styling

const AddPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('db'));
    const newPatient = {
      id: 'p' + (db.patients.length + 1),
      ...formData
    };
    db.patients.push(newPatient);
    localStorage.setItem('db', JSON.stringify(db));
    navigate('/patients');
  };

  return (
    <div className="add-patient-container">
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
        <textarea name="healthInfo" placeholder="Health Info" value={formData.healthInfo} onChange={handleChange} />
        <button type="submit">Add</button>
        <button type="button" onClick={() => navigate('/patients')}>Cancel</button>
      </form>
    </div>
  );
};

export default AddPatient;
