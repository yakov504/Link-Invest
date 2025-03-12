import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PropertyContext = createContext(undefined);

export const useProperty = () => {
  const propertyContext = useContext(PropertyContext);
  if (!propertyContext) {
    throw new Error("useProperty must be used within PropertyProvider");
  }
  return propertyContext;
};

export default function PropertyProvider({ children }) {
  const location = useLocation();
  const [properties, setProperties] = useState([]);

  const allProperties = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/property", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error("User not authenticated");
      }

      const responseData = await response.json();
      setProperties(responseData.data.data);
      return { success: true };
    } catch (err) {
      toast.error('משהו השתבש נסה שוב');
      console.log(err);
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    allProperties();
  }, [location]);

  return (
    <PropertyContext.Provider value={{ properties }}>
      {children}
    </PropertyContext.Provider>
  );
}