import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentEnrollNo, setStudentEnrollNo] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validateInputs = () => {
    if (fullName.trim() === '') {
      setMessage('Full name cannot be empty.');
      return false;
    }
    if (username.length < 5) {
      setMessage('Username must be at least 5 characters long.');
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setMessage('Mobile number must be exactly 10 digits.');
      return false;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage(
        'Password must be at least 8 characters long, contain an uppercase letter, and a number.'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
  
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, mobile, fullName, studentEnrollNo }),
      });
  
      const data = await response.text();  // Read the response as plain text
      console.log('Response Data:', data);
  
      if (!response.ok) {
        setMessage(data || 'Sign up failed.');
      } else {
        navigate('/login');
      }
    } catch (error) {
      setMessage('An error occurred during sign-up.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-10 backdrop-blur">
        <div className="w-full max-w-sm  bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-center mb-4">Sign Up</h2>
          {message && <div className="text-center mb-3 text-red-500 text-sm">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="studentEnrollNo" className="block text-sm text-gray-700">
                Enroll No
              </label>
              <input
                type="text"
                id="studentEnrollNo"
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={studentEnrollNo}
                onChange={(e) => setStudentEnrollNo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="fullName" className="block text-sm text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                pattern="\d{10}"
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 ${isSubmitting ? 'bg-gray-400' : 'bg-green-600'} text-white rounded hover:bg-green-700 focus:outline-none text-sm`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-sm">Have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline text-sm"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
