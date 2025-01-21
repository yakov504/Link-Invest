import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/Navbar';
import Login from './components/Login';
// import Footer from './components/Footer'

function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path = 'Login' element = {<Login/>}/>
        <Route path = 'HomePage' element = {<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default App
