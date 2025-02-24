import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";

const IndicateContext = createContext(undefined);

export const useIndicate = () => {
   const indicateContext = useContext(IndicateContext);
   if (!indicateContext) {
      throw new Error("useIndicate must be used within IndicateProvider");
    }
    return indicateContext;
};

export default function IndicateProvider({children}) {
   const { user, setUser, login } = useAuth()
   const [ error, setError ] = useState(null)
   const [ dailyStatus, setDailyStatus ] = useState()

   const ifUserExist = () => {
      if (!user) {
         const storedUser = localStorage.getItem("user"); // שלוף את המשתמש מ-localStorage
         if (storedUser) {
            // אם יש נתונים ב-localStorage, עדכן את ה-state
            setUser(JSON.parse(storedUser)); // עדכון ה-state עם הנתונים שנמצאו
            console.log("🔹 User from localStorage:", storedUser);
         } else {
            setError("משתמש לא נמצא! לא ניתן ליצור אינדיקטור.");
            console.error("User not found. Unable to create an indicator.");
            return false;  // לא נמצא משתמש, מחזיר false
         }
      }
      // שלב 2: אם יש לך כבר משתמש, המשך עם יצירת האינדיקטור
      if (!user) {
         setError("משתמש לא נמצא! לא ניתן ליצור אינדיקטור.");
         console.error("User not found. Unable to create an indicator.");
         return false; // לא נמצא משתמש, מחזיר false
      }
      return true;  // אם המשתמש נמצא, מחזיר true
   };

   const createIndicator = async(formData) => {
      try{
         if (!ifUserExist()) {
            return; // אם המשתמש לא נמצא, יצא מהפונקציה או ביצוע פעולה אחרת
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
      const responseData = await response.json();
      console.log("Indicator created successfully:", responseData);
      return responseData;

   }catch(error){
      setError('סטטוס נכשל! נסה שוב מאוחר יותר')
      console.error("Error creating indicator:", error.message);
   }
}

const personalDailyStatus = async () => {
   try {
      // if (!user) {
      //    console.error("User not found.");
      //    return;
      // }

      const response = await fetch("http://127.0.0.1:3000/api/v1/indicators/getIndicatorsByAgent", {
         method: 'POST',
         credentials: "include",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id: { agent: user._id } // שולח את ה-agent בתוך אובייקט id
         })
      });

      if (!response.ok) {
         const errorMessage = await response.text();
         throw new Error(`Failed to fetch indicators: ${response.status} - ${errorMessage}`);
      }

      const responseData = await response.json();
      console.log("Indicators fetched successfully:", responseData);
      setDailyStatus(responseData.data.indicators); 
   } catch (err) {
      console.log("Error fetching indicators:", err);
   }
};

useEffect(() => {
   personalDailyStatus()
}, [login]); 


   return (
      <IndicateContext.Provider value={{ createIndicator, dailyStatus }}>
        {children}
      </IndicateContext.Provider>
   
  );
}