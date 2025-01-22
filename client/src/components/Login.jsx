import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

   const [ values, setValues ] = useState({
      email:'',
      password:''
   })
   const [ error, setError ] = useState(null)
   const navigate = useNavigate()

   const handleInput = (e) => {
      setValues(prev => ({...prev,[e.target.name]:e.target.value}))
   } 
  
   const handleSubmit = async (e) => {
      e.preventDefault();
      try{
         const response = await axios.post('http://127.0.0.1:3000/api/v1/users/login', values)
         console.log(response.data);
         navigate('/AgentProfile')
      } catch (err) {
         console.error(err);
         setError('שגיאה בהתחברות, בדוק את המייל או הסיסמה שלך')
      }
   }

  return (
   <div className='loginContainer '>
      <div className="head">
         <h1>התחבר לפני שאתה ממשיך</h1>
      </div>
      <div className="loginPlace">
         <form action="" onSubmit={handleSubmit}>
            <div className="inputs">
               <div className='input'>
                  <input type="email" name='email' placeholder='מייל'
                  value={values.email} onChange={handleInput}/>
               </div>
               {/* {errors.email && <span>{errors.email}</span>} */}
               <div className='input'>
                  <input type="password" name='password' placeholder='סיסמה'
                   value={values.password} onChange={handleInput}/>
               </div>
               {/* {errors.password && <span>{errors.password}</span>} */}
            </div>  
            {error && <p className="error-message">{error}</p>}
            <button type="submit">היכנס</button>
         </form>
      </div>
    </div>
  )
}
