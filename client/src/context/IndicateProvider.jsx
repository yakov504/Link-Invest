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
   const [ weeklySummery, setWeeklySummery ] = useState([])
   const [ monthlySummery, setMonthlySummery ] = useState([])
   const [ allSummery, setAllSummery ] = useState([])



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
         return false; 
      }
      return true; 
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
      responseData.data.indicators === 0 ? 
      setDailyStatus(null) :
      setDailyStatus(responseData.data.indicators); 
   } catch (err) {
      console.log("Error fetching indicators:", err);
   }
};

const personalWeeklySummery = async () => {
   try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/indicators/summary/weekly", {
         method: 'POST',
         credentials: "include",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id: { agent: user._id }
         })
      });

      if (!response.ok) {
         const errorMessage = await response.text();
         throw new Error(`Failed to fetch weekly Summery: ${response.status} - ${errorMessage}`);
      }

      const responseData = await response.json();
      console.log("weekly Summery fetched successfully:", responseData);
      responseData.data === 0 ? 
      setWeeklySummery(null) :
      setWeeklySummery(responseData.data ? [responseData.data] : []); 
   } catch (err) {
      console.log("Error fetching weekly Summery:", err);
   }
};

const personalMonthlySummery = async () => {
   try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/indicators/summary/monthly", {
         method: 'POST',
         credentials: "include",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id: { agent: user._id }
         })
      });

      if (!response.ok) {
         const errorMessage = await response.text();
         throw new Error(`Failed to fetch Monthly Summery: ${response.status} - ${errorMessage}`);
      }

      const responseData = await response.json();
      console.log("Monthly Summery fetched successfully:", responseData);
      responseData.data === 0 ? 
      setMonthlySummery(null) :
      setMonthlySummery(responseData.data ? [responseData.data] : []); 
   } catch (err) {
      console.log("Error fetching Monthly Summery:", err);
   }
};

const personalAllSummery = async () => {
   try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/indicators/summary/all", {
         method: 'POST',
         credentials: "include",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id: { agent: user._id }
         })
      });

      if (!response.ok) {
         const errorMessage = await response.text();
         throw new Error(`Failed to fetch all Summery: ${response.status} - ${errorMessage}`);
      }

      const responseData = await response.json();
      console.log("all Summery fetched successfully:", responseData);
      responseData.data === 0 ? 
      setAllSummery(null) :
      setAllSummery(responseData.data ? [responseData.data] : []); 
   } catch (err) {
      console.log("Error fetching all Summery:", err);
   }
};

useEffect(() => {
   personalDailyStatus()
   personalWeeklySummery()
   personalMonthlySummery()
   personalAllSummery()
}, [login]); 

   return (
      <IndicateContext.Provider value={{ createIndicator, dailyStatus, weeklySummery, monthlySummery, allSummery }}>
        {children}
      </IndicateContext.Provider>
   
  );
}