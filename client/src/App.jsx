import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import axios from 'axios'

import './App.css';
import './index.css';

import HomePage from './components/HomePage/HomePage';
import AgentProfile from './components/Profile/AgentProfile';
import NavBar from './components/NavBar';
import Login from './components/Login';
import BuySellRent from './components/HomePage/BuySellRent'

export default function App() {
  const location = useLocation(); 
  const [navClass, setNavClass] = useState('nav');

  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        if (window.scrollY > 390) {
          setNavClass('nav scrolled');
        } else {
          setNavClass('nav');
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setNavClass('nav scrolled');
    }
  }, [location.pathname]);

  // function checkLoginStatus(){
  //   axios.get('http://127.0.0.1:3000/api/v1/users/logme',)
  // }

  return (
    <div>
      <UserProvider>
        <NavBar className={navClass} />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/AgentProfile" element={<AgentProfile/>} />
          <Route path="/" element={<HomePage />} />
          <Route path='/BuySellRent' element={<BuySellRent/>}/>
        </Routes>
      </UserProvider>
    </div>
  );
}
