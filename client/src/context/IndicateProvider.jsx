import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

const IndicateContext = createContext(undefined);

export const useIndicate = () => {
   const indicateContext = useContext(IndicateContext);
   if (!indicateContext) {
      throw new Error("useAuth must be used within AuthProvider");
    }
    return indicateContext;
};

export default function IndicateProvider({children}) {
   const { user, setUser, checkAuthStatus } = useAuth()
   const [ error, setError ] = useState(null)
   
   const createIndicator = async(formData) => {
      try{
         if (!user) {
            const storedUser = localStorage.getItem("user"); // שלוף את המשתמש מ-localStorage
            if (storedUser) {
                  // אם יש נתונים ב-localStorage, עדכן את ה-state
                  setUser(JSON.parse(storedUser)); // עדכון ה-state עם הנתונים שנמצאו
                  console.log("🔹 User from localStorage:", storedUser);
            } else {
               setError("משתמש לא נמצא! לא ניתן ליצור אינדיקטור.");
               console.error("User not found. Unable to create an indicator.");
               return;
            }
         }
        // שלב 2: אם יש לך כבר משתמש, המשך עם יצירת האינדיקטור
        if (!user) {
         // אם עדיין אין לך משתמש (מקרה קיצוני אם לא נמצא ב-localStorage), עצור
         setError("משתמש לא נמצא! לא ניתן ליצור אינדיקטור.");
         console.error("User not found. Unable to create an indicator.");
         return;
        }

         const response = await fetch("http://127.0.0.1:3000/api/v1/indicators",{
            method: 'POST',
            credentials: "include", // שולח את ה-cookie עם הבקשה
            headers: {
               'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            ...formData,
            agent: 
            [
              user._id,
            ]
         })
      })
      if (!response.ok) {
         const errorMessage = await response.text();
         throw new Error(`Failed to create indicator: ${response.status} - ${errorMessage}`);
      }
      const data = await response.json();
      console.log("Indicator created successfully:", data);
      setError('סטטוס נוצר בהצלחה!')
      return data;

   }catch(error){
      setError('סטטוס נכשל! נסה שוב מאוחר יותר')
      console.error("Error creating indicator:", error.message);
   }
}
   return (
      <IndicateContext.Provider value={{ createIndicator, error }}>
        {children}
      </IndicateContext.Provider>
   
  );
}