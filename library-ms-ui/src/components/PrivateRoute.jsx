import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ requiredRole }) => {
    const { user } = useSelector((state) => state.auth);
  
    console.log('User in PrivateRoute:', user); // Debugging
  
    if (!user) {
      console.log('User is not authenticated. Redirecting to /login.');
      return <Navigate to="/login" />;
    }
  
    if (requiredRole && user.role !== requiredRole) {
      console.log(`Role mismatch: Required=${requiredRole}, Actual=${user.role}`);
      return <Navigate to="/403" />;
    }
  
    return <Outlet />;
  };
  
  export default PrivateRoute;
  