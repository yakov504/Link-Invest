import React, { useState } from "react";
import { Form, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import { toast } from 'react-toastify';
// import LoadingSpiner from '../assets/UIElemnt/LoadingSpinner'
import './Login.css';

export default function Login() {
  const { login, error } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(values.email, values.password);
    if (response.success) {
      toast.success('התחברת בהצלחה!')
      navigate("/AgentProfile");
    } else {
      toast.error('שגיאה בהתחברות נסה שוב!')
      // console.log(response.message);
    }
  };
  
 
  return (
    <div className='loginContainer'>
      {/* {isLoading && <LoadingSpiner asOverlay/>} */}
      <div className="head">
        <h1>התחבר לפני שאתה ממשיך</h1>
      </div>
      <div className="loginPlace">
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className='input'>
              <input 
                type="email" 
                name='email' 
                placeholder='מייל'
                value={values.email} 
                onChange={handleInput} 
                required
              />
            </div>
            <div className='input'>
              <input 
                type="password" 
                name='password' 
                placeholder='סיסמה'
                value={values.password} 
                onChange={handleInput} 
                required
              />
            </div>
          </div>  
          <div className='forgotPassword'>
            <span>שכחתי סיסמה</span>
          </div>
          <button className='loginBtn' type="submit">היכנס</button>
        </form>
      </div>
    </div>
  );
}
