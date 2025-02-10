import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// יצירת הקונטקסט
const AuthContext = createContext(undefined);

// פונקציה לשימוש ב-AuthContext
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return authContext;
};

// קומפוננטת AuthProvider
export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  // פונקציה שמביאה Access Token חדש מה-Refresh Token
  const getNewAccessToken = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/v1/users/refreshToken", {
        withCredentials: true,
      });
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      setAccessToken(null);
      return null;
    }
  };

  // אפקט להרצת חידוש טוקן כל 14 דקות
  useEffect(() => {
    const interval = setInterval(() => {
      getNewAccessToken();
    }, 14 * 60 * 1000); // 14 דקות
    return () => clearInterval(interval);
  }, []);

  // Axios Interceptor: מוסיף את ה-Access Token אוטומטית לבקשות
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(async (config) => {
      if (!accessToken) {
        const newToken = await getNewAccessToken();
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, getNewAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}


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
