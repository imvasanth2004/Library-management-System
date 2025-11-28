
import React, { useEffect, useState } from 'react';
import logo from '../assets/icon.jpeg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const username = useSelector((state) => state.auth.username); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  
  useEffect(() => {
    if (username) {
      console.log(username);
    }
    if (userData) {
      console.log(userData.fullName);
      console.log(userData.roles);
    }
  }, [userData, username]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-green-400 text-white flex items-center justify-between p-4 px-6 py-4 mr-2 ml-2 shadow-md">
      
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handleNavigation('/')}
      >
        <img src={logo} alt="Logo" className="h-10 w-10 mr-2 rounded-full" 
        onClick={handleLogoClick}
        />
        <span className="text-lg font-bold"></span>
      </div>

      
      <ul
        className={`flex flex-col md:flex-row items-center md:space-x-6 absolute md:relative top-16 md:top-auto left-0 md:left-auto w-full md:w-auto bg-blue-600 md:bg-transparent p-4 md:p-0 transition-transform duration-300 ${
          isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full md:translate-y-0'
        }`}
      >
        
         
        <li
          className="cursor-pointer hover:text-blue-300"
          onClick={() => handleNavigation('/')}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:text-blue-300"
          onClick={() => handleNavigation('/login')}
        >
          Books
        </li>
        
        <li
          className="cursor-pointer hover:text-blue-300"
          onClick={handleLogin}
        >
          Login
        </li>
      </ul>

     
      <button className="hidden md:block bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-full">
        🔔
      </button>

      
      <button
        className="text-white text-2xl md:hidden focus:outline-none"
        onClick={toggleMenu}
      >
        ☰
      </button>
    </nav>
  );
}

export default Header;

