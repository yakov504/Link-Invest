import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css'
import HomePage from './components/HomePage/HomePage';
import AgentProfile from './components/AgentProfile'
import NavBar from './components/NavBar';
import Login from './components/Login';

function App() {
  // const location = useLocation();
  // const [navBarClass, setNavBarClass] = useState('nav');

  // useEffect(() => {
  //   if (location.pathname === '/HomePage') {
  //     setNavBarClass('nav'); // Set to 'nav' when on HomePage
  //   } else {
  //     setNavBarClass('nav_bar'); // Set to 'nav_bar' for other pages
  //   }
  // }, [location.pathname]); // Re-run the effect when the path changes

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path = 'Login' element = {<Login/>}/>
        <Route path = 'AgentProfile' element = {<AgentProfile/>}/>
        <Route path = 'HomePage' element = {<HomePage/>}/>
        {/* {<Route path = 'HomePage' element = {<HomePage/>}/> ? navBarClass : handleNavBar()} */}
      </Routes>
    </div>
  )
}

export default App
