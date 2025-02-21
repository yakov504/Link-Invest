import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import customFetch from '../utils/customFetch'

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return authContext;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ error, setError ] = useState()

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/users/me", {
          method: "GET",
          credentials: "include", // שולח את ה-cookie עם הבקשה
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          throw new Error("User not authenticated");
      }

      const responseData = await response.json();
      setUser(responseData.data.user);
      localStorage.setItem("user", JSON.stringify(responseData.data.user)); // 🔹 שומר ב-localStorage
   
      } catch (err) {
        console.error("Failed to authenticate user:", err);
        setUser(null);
        localStorage.removeItem("user"); // 🔹 מוחק מהזיכרון אם האימות נכשל
    }
  };  

  useEffect(() => {
    checkAuthStatus(); // בדיקת חיבור המשתמש בטעינת הדף
  }, []);

  const login = async (email, password) => {
    try{
      const response = await fetch("http://127.0.0.1:3000/api/v1/users/login", {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
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
      setUser(responseData.data.user)
      localStorage.setItem("user", JSON.stringify(responseData.data.user));
      console.log("user data",responseData); 
     
      return { success: true, responseData };
    }catch(err){
      setError('משהו השתבש נסה שוב');
      console.log(error);
      return { success: false, message: err.message };
    }
    
  }

  const logout = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/v1/users/logout",
       {}, 
       { withCredentials: true });
  
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, error, checkAuthStatus, logout }}>
      {children}
    </AuthContext.Provider>
 
);
}

























