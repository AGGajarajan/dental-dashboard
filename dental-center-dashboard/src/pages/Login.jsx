// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import dentalBg from '../images/dental.jpeg'; // ✅ Your image inside src/images

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      setError('');
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${dentalBg})`,
        backgroundColor: '#e6f7ff', // fallback color
      }}
    >
      <div className="  p-8 rounded-xl shadow-2x2 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center text-black-800 mb-6">
          🦷 Dental Center Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-black-700">Email</label>
            <input
              type="email"
              className="w-full px-6 py-2 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-black-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-red-700 rounded-md  focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full 	bg-emerald-500  hover:bg-emerald-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
