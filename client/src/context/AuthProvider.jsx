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
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const getNewAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/refreshToken",
        {},
        { withCredentials: true } // מעביר את `withCredentials` בהגדרות ולא בגוף הבקשה
      );
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      setAccessToken(null);
      return null;
    }
  };


 // טוען משתמש לאחר טעינת הדף או שינוי ב-accessToken
 useEffect(() => {
  const fetchUser = async () => {
    if (!accessToken) {
      const newToken = await getNewAccessToken(); // נסה להביא טוקן חדש אם אין
      if (!newToken) return; // אם נכשל, אל תמשיך
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/v1/users/me",
        {
          headers: { Authorization: `Bearer ${accessToken || await getNewAccessToken()}` },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  };

  fetchUser();
}, [accessToken]);

  // רץ ברינדור הראשוני + כל 14 דקות
  // useEffect(() => {
  //   getNewAccessToken(); // מריץ פעם אחת בהתחלה
  //   const interval = setInterval(() => {
  //     getNewAccessToken();
  //   }, 14 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!accessToken) return; 

  //     try {
  //       const response = await axios.get("http://127.0.0.1:3000/api/v1/users/me", {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       setUser(response.data); // שמירת נתוני המשתמש בסטייט
  //     } catch (error) {
  //       console.error("Failed to fetch user:", error);
  //       setUser(null); // במידה ויש שגיאה, מאפסים את המשתמש
  //     }
  //   };

  //   fetchUser();
  // }, [accessToken]); // מופעל בכל פעם שה-`accessToken` משתנה

  return (
    <AuthContext.Provider value={{ accessToken, getNewAccessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}


  // Axios Interceptor: מוסיף את ה-Access Token אוטומטית לבקשות
  // useLayoutEffect(() => {
  //   const requestInterceptor = axios.interceptors.request.use(async (config) => {
  //     if (!accessToken) {
  //       const newToken = await getNewAccessToken();
  //       if (newToken) {
  //         config.headers.Authorization = `Bearer ${newToken}`;
  //       }
  //     } else {
  //       config.headers.Authorization = `Bearer ${accessToken}`;
  //     }
  //     return config;
  //   });

  //   return () => {
  //     axios.interceptors.request.eject(requestInterceptor);
  //   };
  // }, [accessToken]);
















// import { createContext, useState, useEffect, useContext, useLayoutEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext(undefined);

// export const useAuth = () => {
//    const authContext = useContext(AuthContext);

//    if(!authContext) {
//       throw new Error('useAuth must by used whitn AuthProvider')
//    }

//    return authContext;
// }

// export default function AuthProvider() {
//    const [ token, setToken ] = useState();

//    useEffect(() =>{
//       const fetchMe = async () => {
//          try{
//             const response = await axios.get("http://127.0.0.1:3000/api/v1/me");
//             setToken(response.data.accessToken);
//          }catch{
//             setToken(null)
//          }
//       };
//       fetchMe()
//    }, []);

//    useLayoutEffect(() => {
//       const authInterceptor = axios.interceptors.request.use((config) =>{
//          config.headers.Authorization =
//             !config._retry && token 
//             ? `Bearer ${token}`
//             : config.headers.Authorization;
//          return config;
//       });
//       return () => {
//          axios.interceptors.request.eject(authInterceptor);
//       };
//    }, [token]);


//    useLayoutEffect(() => {
//       const refreshInterceptor = axios.interceptors.response.use(
//          (response) => response,
//          async (error) =>{
//             const originalRequest = error.config;

//             if(
//                error.response.status === 403 &&
//                error.response.data.message === 'Unauthotized'
//             ){
//                try{
//                   const response = await axios.get("http://127.0.0.1:3000/api/v1/refeshToken");

//                   setToken(response.data.accessToken);

//                   originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//                   originalRequest._retry = true;

//                   return axios(originalRequest);
//                }catch{
//                   setToken(null)
//                }
//             }

//             return Promise.reject(error)
//          },
//       );
//       return () => {
//          axios.interceptors.response.eject(refreshInterceptor);
//       }
//    })
//   return (
//     <div>
      
//     </div>
//   )
// }
