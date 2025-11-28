
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './redux/authSlice';
import Header from './Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSuccess = (userData, token) => {
    dispatch(setCredentials({ token, user: userData }));

    if (userData === 'ROLE_ADMIN') {
      navigate('/manageBooks');
    } else if (userData === 'ROLE_STUDENT') {
      navigate('/viewBooks');
    } else {
      console.error('Unknown role:', userData);
      setErrorMessage('Role is not recognized.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Inside handleSubmit');
    console.log('Username:', username, 'Password:', password);

    try {
      console.log('Attempting API call');
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Response received:', data);

      if (response.ok) {
        console.log('Login successful, dispatching credentials');
        handleLoginSuccess(data.userData, data.token);
      } else {
        console.error('Login failed:', data.message);
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setErrorMessage('Invalid credentials.');
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-10 backdrop-blur">
        <div className="relative w-full max-w-md bg-white p-8 rounded shadow-lg">
        <button
            onClick={() => navigate('/')}
            className=" absolute top-2 right-2 text-gray-600 hover:text-gray-1000 text-2xl font-extrabold"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          
          {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <span>Don't have an account? </span>
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
