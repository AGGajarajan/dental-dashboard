// src/pages/Incidents/AddIncident.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/AddIncident.css"; // Assuming you have a CSS file for styling

const AddIncident = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    status: '',
    nextDate: '',
    files: []
  });

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem('db'));
    if (db) setPatients(db.patients);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleFileChange = e => {
    const filesArr = Array.from(e.target.files);
    const readers = filesArr.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setFormData(prev => ({ ...prev, files: [...prev.files, ...results] }));
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('db'));

    const newIncident = {
      id: 'i' + (db.incidents.length + 1),
      patientId: formData.patientId,
      title: formData.title,
      description: formData.description,
      comments: formData.comments,
      appointmentDate: formData.appointmentDate,
      cost: formData.cost ? Number(formData.cost) : 0,
      status: formData.status,
      nextDate: formData.nextDate,
      files: formData.files
    };

    db.incidents.push(newIncident);
    localStorage.setItem('db', JSON.stringify(db));
    navigate('/incidents');
  };

  const removeFile = (name) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.name !== name)
    }));
  };

  return (
    <div className="add-incident-container">
      <h2>Add Incident</h2>
      <form onSubmit={handleSubmit}>
        <select name="patientId" value={formData.patientId} onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} />
        <input type="datetime-local" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
        <input type="number" name="cost" placeholder="Cost" value={formData.cost} onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <input type="date" name="nextDate" value={formData.nextDate} onChange={handleChange} />
        <input type="file" multiple onChange={handleFileChange} />
        
        <div className="file-preview">
          {formData.files.map(f => (
            <div key={f.name} className="file-item">
              <span>{f.name}</span>
              <button type="button" onClick={() => removeFile(f.name)}>Remove</button>
            </div>
          ))}
        </div>

        <button type="submit">Add Incident</button>
        <button type="button" onClick={() => navigate('/incidents')}>Cancel</button>
      </form>
    </div>
  );
};

export default AddIncident;
