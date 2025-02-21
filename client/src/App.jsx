import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import IndicateProvider from './context/IndicateProvider'
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

import './App.css';
import './index.css';

import HomePage from './components/HomePage/HomePage';
import AgentProfile from './components/Profile/AgentProfile';
import NavBar from './components/NavBar';
import Login from './components/Login';
import BuySellRent from './components/HomePage/BuySellRent'
import DailyIndicator from './components/Profile/Indicators/DailyIndicator';
import Indicators from './components/Profile/Indicators/Indicators'
import Agents from './components/Profile/Agents/Agents'
import PersonalIndicator from './components/Profile/Indicators/PersonalIndicator';

export default function App() {
  // const { user, getUserData } = useAuth();
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

  return (
    <div>
      <AuthProvider>
        <IndicateProvider>
          <NavBar className={navClass} />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/AgentProfile" element={<AgentProfile/>}/> 
            {/* // user={user} />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path='/BuySellRent' element={<BuySellRent />}/>
            <Route path='/DailyIndicator' element={<DailyIndicator />}/>
            <Route path='/Indicators' element={<Indicators />}/>
            <Route path='/PersonalIndicator' element={<PersonalIndicator />}/>
            <Route path='/Agents' element={<Agents />}/>
          </Routes>
        </IndicateProvider>
      </AuthProvider>
    </div>
  );
}
