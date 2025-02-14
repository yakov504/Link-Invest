import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return authContext;
};

export default function AuthProvider({ children }) {
  // const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [ error, setError ] = useState()


  const login = async (email, password) => {
    try{
      const response = await fetch("http://127.0.0.1:3000/api/v1/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
        
      })
      
      const responseData = await response.json();
      if(!response.ok){
       throw new Error(responseData.message|| "Login failed")
      }
     setUser(responseData)
    //  console.log(responseData);
    console.log("user data",responseData); 
     console.log("user:",user);
     
     return { success: true, responseData };
    // useAuth.login()
    }catch(err){
      setError(err.message);
      console.log(error);
      return { success: false, message: err.message };
    }
  }
  
  // const getUserData = async (token) => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:3000/api/v1/users/me", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       },
  //       withCredentials: true
  //     });
  //     console.log("User Data Response:", response);
  //     setUser(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch user data:", error);
  //   }
  // };
  

  // const logout = async () => {
  //   await axios.post("http://127.0.0.1:3000/api/v1/users/logout", {}, { withCredentials: true });
  //   setAccessToken(null);
  //   setUser(null);
  // };

  return (
    <AuthContext.Provider value={{ user, login, error }}>
       {/* getUserData,logout */}
      {children}
    </AuthContext.Provider>
 
);
}





  // const login = async (email, password) => {
  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:3000/api/v1/users/login",
  //       { email, password },
  //       { withCredentials: true }
  //     );
  
  //     // שמירת המשתמש וה-Token
  //     const { accessToken, user } = response.data;
  //     setAccessToken(accessToken);
  //     setUser(user);
  
  //     console.log("Access Token:", accessToken); // בדיקה שהתקבל טוקן
  
  //     // שליפת נתוני המשתמש עם הטוקן שהתקבל
  //     await getUserData(accessToken);
  
  //     return { success: true };
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     return { success: false, message: error.response?.data?.message || "Login failed" };
  //   }
  // };

























