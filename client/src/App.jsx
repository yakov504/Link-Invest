import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import IndicateProvider from './context/IndicateProvider'
import AgentProvider from './context/AgentProvider';
import GoalProvider from './context/GoalProvider';
import PropertyProvider from './context/PropertyProvider';

import './App.css';
import './index.css';

import HomePage from './components/HomePage/HomePage';
import AgentProfile from './components/Profile/AgentProfile';
import NavBar from './components/NavBar';
import Login from './components/Login';
import BuySellRent from './components/HomePage/BuySellRent'
import DailyIndicator from './components/Profile/Indicators/DailyIndicator';
import Agents from './components/Profile/Agents/Agents'
import PersonalIndicator from './components/Profile/Indicators/PersonalIndicator';
import AdminGoals from './components/Profile/Goals/AdminGoals';
import Sale from './components/Propertys/Sale'
import Rent from './components/Propertys/Rent'
import NewProperty from './components/Propertys/NewProperty';
import Performance from './components/Profile/Goals/Performance';

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
          <AgentProvider>
            <GoalProvider>
              <PropertyProvider>
                <NavBar className={navClass} />
                <Routes>
                  <Route path="/Login" element={<Login />} />
                  <Route path="/AgentProfile" element={<AgentProfile/>}/> 
                  <Route path="/" element={<HomePage />} />
                  <Route path='/BuySellRent' element={<BuySellRent />}/>
                  <Route path='/DailyIndicator' element={<DailyIndicator />}/>
                  <Route path='/PersonalIndicator' element={<PersonalIndicator />}/>
                  <Route path='/Agents' element={<Agents />}/>
                  <Route path='/AdminGoals' element={<AdminGoals />}/>
                  <Route path='/Performance' element={<Performance/>}/>
                  <Route path='/Sale' element={<Sale/>}/>
                  <Route path='/Rent' element={<Rent/>}/>
                  <Route path='/NewProperty' element={<NewProperty/>}/>
                </Routes>
              </PropertyProvider>
            </GoalProvider>
          </AgentProvider>
        </IndicateProvider>
      </AuthProvider>
    </div>
  );
}
