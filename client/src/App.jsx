import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import AgentProfile from './components/AgentProfile';
// import Footer from './components/Footer'

function App() {

  return (
    <div>
      <Header/>
      {/* <Footer/> */}
      <Routes>
        <Route path = 'AgentProfile' element = {<AgentProfile/>}/>
      </Routes>
    </div>
  )
}

export default App
