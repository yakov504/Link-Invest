import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import AgentProfile from './components/AgentProfile';
import NavBar from './components/NavBar';
import Login from './components/Login';
import BuySellRent from './components/HomePage/BuySellRent'

export default function App() {
  const location = useLocation(); 
  const [isScroll, setIsScroll] = useState(false);
  const [navClass, setNavClass] = useState('nav');

  useEffect(() => {
    if (location.pathname === '/HomePage') {
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
      <NavBar className={navClass} />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/AgentProfile" element={<AgentProfile />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path='/BuySellRent' element={<BuySellRent/>}/>
      </Routes>
    </div>
  );
}
