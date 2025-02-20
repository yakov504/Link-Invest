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

  //  const checkAuthStatus = async () => {
  //     try {
  //       const token = getCookie('token'); // קבלת ה-token מהעוגיות
  
  //       if (!token) {
  //         console.log("No token found.");
  //         setUser(null);
  //         setLoading(false);
  //         return;
  //       }
  
  //       // אם יש token, נבצע קריאה לשרת לאימות
  //       const response = await fetch("http://127.0.0.1:3000/api/v1/users/me", {
  //         method: "GET",
  //         credentials: "include", // שולח את ה-cookie עם הבקשה
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`, // שליחה של token עם הבקשה
  //         },
  //       });
  
  //       if (!response.ok) {
  //         throw new Error("User not authenticated");
  //       }
  
  //       const responseData = await response.json();
  //       setUser(responseData.data.user); // עדכון ה-state
  //       localStorage.setItem("user", JSON.stringify(responseData.data.user)); // שמירה ב-localStorage
  //     } catch (err) {
  //       console.error("Failed to authenticate user:", err);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   // פונקציה לשליפת ה-token מה-cookie
  //   const getCookie = (name) => {
  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) return parts.pop().split(';').shift();
  //   };
  
  //   useEffect(() => {
  //     checkAuthStatus(); // בדיקת חיבור המשתמש בטעינת הדף
  //   }, []);

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
    // useAuth.login()
    }catch(err){
      setError('משהו השתבש נסה שוב');
      console.log(error);
      return { success: false, message: err.message };
    }
    
  }

  // const logout = async () => {
  //   await axios.post("http://127.0.0.1:3000/api/v1/users/logout", {}, { withCredentials: true });
  //   setUser(null);
  // };

  return (
    <AuthContext.Provider value={{ user, login, error, checkAuthStatus}}>
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

























