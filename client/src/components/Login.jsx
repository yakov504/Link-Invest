import React, { useState } from "react";
import { Form, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import { toast } from 'react-toastify';
// import LoadingSpiner from '../assets/UIElemnt/LoadingSpinner'
import './Login.css';

export default function Login() {
  const { login, error } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });
  // const [ error, setError ] = useState()
  // const [ isLoading , setIsLoading ] = useState(true)
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(values.email, values.password);
    if (response.success) {
      navigate("/AgentProfile");
    } else {
      console.log(response.message);
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try{
  //     const result = fetch("http://127.0.0.1:3000/api/v1/users/login", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         email: values.email,
  //         password: values.password
  //       })
        
  //     })
      
  //     const responseData = await (await result).json();
  //     if(!result.ok){
  //       throw new Error(responseData.message)
  //     }
  //     navigate('/AgentProfile');
  //     console.log(responseData);
  //     handleSubmit()
  //     // setIsLoading(false)
      
  //   }catch(err){

  //     if (!result.success) {
  //       console.log(err);
  //       // setIsLoading(false)
  //       setError(err.message || 'משהו השתבש, נסה מאוחר יותר');
  //       return;
  //     }
  //   }
  
  // };


  return (
    // <React.Fragment>
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
          {error && <p className="error-message">{error}</p>}
          <div className='forgotPassword'>
            <span>שכחתי סיסמה</span>
          </div>
          <button className='loginBtn' type="submit">היכנס</button>
        </form>
      </div>
    </div>
    // </React.Fragment>
  );
}


// import { useState } from "react";
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from "../context/AuthProvider"
// import './Login.css'
// import AgentProfile from './Profile/AgentProfile'
// import axios from "axios";

// export default function Login() {
//   const { login } = useAuth();
//   const [values, setValues] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await login(values.email, values.password);

//     if (!result.success) {
//       setError(result.message);
//       return; 
//     }
//     setTimeout(() => {
//       navigate('/AgentProfile');
//     }, 2000); // 1 שנייה עיכוב
//   };

//   return (
//     <div className='loginContainer'>
//       <div className="head">
//         <h1>התחבר לפני שאתה ממשיך</h1>
//       </div>
//       <div className="loginPlace">
//         <form action="" onSubmit={handleSubmit}>
//           <div className="inputs">
//             <div className='input'>
//               <input 
//                 type="email" 
//                 name='email' 
//                 placeholder='מייל'
//                 value={values.email} 
//                 onChange={handleInput} 
//               />
//             </div>
//             {/* {errors.email && <span>{errors.email}</span>} */}
//             <div className='input'>
//               <input 
//                 type="password" 
//                 name='password' 
//                 placeholder='סיסמה'
//                 value={values.password} 
//                 onChange={handleInput} 
//               />
//             </div>
//             {/* {errors.password && <span>{errors.password}</span>} */}
//           </div>  
//           {error && <p className="error-message">{error}</p>}
//           <div className='forgotPassword'>
//             <span>שכחתי סיסמה</span>
//           </div>
//           <button className='loginBtn' type="submit">היכנס</button>
//         </form>
//       </div>
//     </div>
//   );
// }



   // const handleSubmit = async (e) => {
      //     e.preventDefault();
      //     console.log("Submitting login form:", values);
      //     try {
      //       const response = await axios.post("http://127.0.0.1:3000/api/v1/users/login",
      //         values,
      //         { withCredentials: true },
      //         console.log(values)        
      //       );
      //       navigate('/AgentProfile')
      //       setAccessToken(response.data.accessToken);
      //       console.log("התחברות בוצעה בהצלחה!");
      //     } catch (err) {
      //       setError("שגיאה בהתחברות, נסה שוב");
      //     }
      //   };


// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './Login.css'
// import AgentProfile from './Profile/AgentProfile'
// import axios from 'axios'

// export default function Login() {

//    const [ values, setValues ] = useState({
//       email:'',
//       password:''
//    })
//    const [ error, setError ] = useState(null)
//    const navigate = useNavigate()

//    const handleInput = (e) => {
//       setValues(prev => ({...prev,[e.target.name]:e.target.value}))
//    } 
  
//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       console.log('נשלח לשרת:', values);
//       try{
//          const response = await axios.post('http://127.0.0.1:3000/api/v1/users/login', values, {
//             withCredentials: true
//          });
         
//          console.log(response.data);
//          navigate('/AgentProfile')
//       } catch (err) {
//          console.error(err.response ? err.response.data : err);
//          setError('שגיאה בהתחברות, בדוק את המייל או הסיסמה שלך')
//       }
//    }

//   return (
//    <div className='loginContainer '>
//       <div className="head">
//          <h1>התחבר לפני שאתה ממשיך</h1>
//       </div>
//       <div className="loginPlace">
//          <form action="" onSubmit={handleSubmit}>
//             <div className="inputs">
//                <div className='input'>
//                   <input type="email" name='email' placeholder='מייל'
//                   value={values.email} onChange={handleInput}/>
//                </div>
//                {/* {errors.email && <span>{errors.email}</span>} */}
//                <div className='input'>
//                   <input type="password" name='password' placeholder='סיסמה'
//                    value={values.password} onChange={handleInput}/>
//                </div>
//                {/* {errors.password && <span>{errors.password}</span>} */}
//             </div>  
//             {error && <p className="error-message">{error}</p>}
//             <div className='forgotPassword'>
//                <span>שכחתי סיסמה</span>
//             </div>
//             <button className='loginBtn' type="submit">היכנס</button>
//          </form>
//       </div>
//    </div>
//   )
// }
