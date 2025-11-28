import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import ViewBooks from './components/ViewBooks';
import ManageBooks from './components/ManageBooks';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Footer from './components/Footer';

import UserHistory from './components/userHistory';
import BorrowHistory from './components/dashboard/BookHistory';
import PrivateRoute from './components/PrivateRoute';
import Error403 from './components/error/Error403';


function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

       

        <Route element={<PrivateRoute requiredRole="ROLE_ADMIN" />}>
          <Route path="/manageBooks" element={<ManageBooks />} />
        </Route>

        
          <Route path="/viewBooks" element={<ViewBooks />} />
      
      <Route path='/signup' element={<SignUp />} />
      <Route path='/borrowhistory' element={<UserHistory />} />
    
      <Route path='/bookhistory' element={<BorrowHistory />} />

      <Route path="/403" element={<Error403 />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
