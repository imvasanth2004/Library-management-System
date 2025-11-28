import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/icon.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { clearCredentials } from './redux/authSlice'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    
    dispatch(clearCredentials());
   navigate('/');
  };

  return (
    <nav className="bg-gray-100 text-black mt-0 px-6 py-4 flex justify-between items-center">
     
      <div className="text-xl font-semibold">
      <img src={logo} alt="Logo" className="h-10 w-10 mr-2 rounded-full" />
        <span className="text-lg font-bold"></span>
      
      </div>

     
      {isAuthenticated && (
        <div className="flex items-center gap-6">
                  
                   
           <Link to='/viewBooks'><span  className="text-sm">ViewBooks</span></Link>
          <span className="text-sm">Welcome, {user?.username || 'User'}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 focus:outline-none transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
