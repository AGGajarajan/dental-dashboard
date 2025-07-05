import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [pending, setPending] = useState(0);

useEffect(() => {
  const db = JSON.parse(localStorage.getItem('db'));
  const incidents = db?.incidents || [];

  const upcoming = incidents.filter((i) =>
    new Date(i.appointmentDate) > new Date()
  );

  const completed = incidents.filter((i) => i.status === 'Completed');
  const pending = incidents.filter((i) => i.status !== 'Completed');
  const totalRevenue = completed.reduce((sum, i) => sum + (i.cost || 0), 0);

  setAppointments(upcoming.slice(0, 10));
  setRevenue(totalRevenue);
  setPending(pending.length);
}, []);


  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <Header />
        <h2>Welcome, {user?.email}</h2>

        {user?.role === 'Admin' && (
          <div className="dashboard-buttons">
            <button onClick={() => navigate('/patients')}>👥 Manage Patients</button>
            <button onClick={() => navigate('/incidents')}>🦷 Manage Incidents</button>
            <button onClick={() => navigate('/calendar')}>📅 View Calendar</button>
          </div>
        )}

        <div className="dashboard-cards">
          <div className="card">
            <h3>Upcoming Appointments</h3>
            {appointments.length === 0 ? (
              <p>No upcoming appointments</p>
            ) : (
              <ul>
                {appointments.map((appt) => (
                  <li key={appt.id}>
                    {appt.title} on {new Date(appt.appointmentDate).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card">
            <h3>Revenue</h3>
            <p>${revenue}</p>
          </div>

          <div className="card">
            <h3>Pending Treatments</h3>
            <p>{pending}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
