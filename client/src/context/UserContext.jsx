// import { createContext, useState, useEffect, useContext, useLayoutEffect } from "react";
// import axios from "axios";
// // import Cookies from "js-cookie";

// export const UserContext = createContext(undefined);

// export const UserProvider = ({ children }) => {
  
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = Cookies.get("jwt");  // מקבל את ה- JWT מהקוקי
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("http://127.0.0.1:3000/api/v1/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data.data.user);  // שים את הנתונים של המשתמש
//       } catch (err) {
//         console.error("Error fetching user", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
