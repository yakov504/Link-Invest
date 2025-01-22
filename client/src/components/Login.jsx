import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {

   const [ value, setValue ] = useState()

   const handleSubmit = (e) => {
      e.preventDefault()
      axios.get('', {value}
         .then( result => console.log(result))
         .catch( err => console.log(err))
      )
   }
  return (
   <div className='loginContainer '>
      <div className="head">
         <h1>התחבר לפני שאתה ממשיך</h1>
      </div>
      <div className="loginPlace">
         <form action="" >
            <div className="inputs">
               <div className='input'>
                  <input type="email" name='email' placeholder='מייל'/>
               </div>
               {/* {errors.email && <span>{errors.email}</span>} */}
               <div className='input'>
                  <input type="password" name='password' placeholder='סיסמה'/>
               </div>
               {/* {errors.password && <span>{errors.password}</span>} */}
            </div>  
            <button type="submit">היכנס</button>
         </form>
      </div>
    </div>
  )
}
