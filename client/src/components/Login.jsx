import React from 'react'
import { useState } from 'react'

export default function Login() {
  return (
   <div className='loginContainer '>
      <div className="head">
         <h1>התחבר לפני שאתה ממשיך</h1>
      </div>
      <div className="loginPlace">
         <form action="" >
            <div className="inputs">
               <div className='input'>
                  <input type="name" name='שם' placeholder='שם'/>
               </div>
               {/* {errors.email && <span>{errors.email}</span>} */}
               <div className='input'>
                  <input type="password" name='סיסמה' placeholder='סיסמה'/>
               </div>
               {/* {errors.password && <span>{errors.password}</span>} */}
            </div>  
            <button type="submit">היכנס</button>
         </form>
      </div>
    </div>
  )
}
