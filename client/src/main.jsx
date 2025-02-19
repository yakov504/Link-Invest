import React from 'react';
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import AuthProvider from './context/AuthProvider.jsx';
import IndicateProvider from './context/IndicateProvider.jsx';
import App from './App.jsx'
import {ToastContainer} from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <IndicateProvider>
        <BrowserRouter>
          <App />
          <ToastContainer position='top-center'/>
        </BrowserRouter>
      </IndicateProvider>
    </AuthProvider>
  </React.StrictMode>
);
