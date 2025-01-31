import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios'

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
  // const [ user, setUser ] = useState(null)
  // const [ loading, setLoading ] = useState(true);

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

  // useEffect(() => {
  //   const fetchUserDate = async () => {
  //     try{
  //       const token = localStorage.getItem('teken');
  //       if(!token){
  //         setLoading(false)
  //         return;
  //       }
  //       const res = await axios.get('http://127.0.0.1:3000/api/v1/users/logme/:name', {
  //         headers: {Authorization: `Beares ${token}`},
  //       })
  //       setUser( res.data.data.user);
  //     }catch( err ){
  //       console.log('error fetching user',err);
  //     } finally{
  //       setLoading(false)
  //     }
  //   };
  //   fetchUserDate();
  // },[])

  return (
    <div>
      <NavBar className={navClass} />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/AgentProfile" element={<AgentProfile/>} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path='/BuySellRent' element={<BuySellRent/>}/>
      </Routes>
    </div>
  );
}
