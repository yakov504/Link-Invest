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

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        { email, password },
        { withCredentials: true }
      );

      setAccessToken(response.data.accessToken);
      setUser(response.data.user);

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const logout = async () => {
    await axios.post("http://127.0.0.1:3000/api/v1/users/logout", {}, { withCredentials: true });
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
















