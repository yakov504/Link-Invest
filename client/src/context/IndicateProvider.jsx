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
   const [selectedAgentId, setSelectedAgentId] = useState(null)


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

const fetchAgentData = async (agentId) => {
   const agent = agentId || user._id;

   try {
      const [dailyResponse, weeklyResponse, monthlyResponse, allResponse] = await Promise.all([
         fetch("http://127.0.0.1:3000/api/v1/indicators/getIndicatorsByAgent", {
            method: 'POST',
            credentials: "include",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: { agent } })
         }),
         fetch("http://127.0.0.1:3000/api/v1/indicators/summary/weekly", {
            method: 'POST',
            credentials: "include",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: { agent } })
         }),
         fetch("http://127.0.0.1:3000/api/v1/indicators/summary/monthly", {
            method: 'POST',
            credentials: "include",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: { agent } })
         }),
         fetch("http://127.0.0.1:3000/api/v1/indicators/summary/all", {
            method: 'POST',
            credentials: "include",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: { agent } })
         })
      ]);

      if (!dailyResponse.ok || !weeklyResponse.ok || !monthlyResponse.ok || !allResponse.ok) {
         throw new Error("One or more requests failed");
      }

      const [dailyData, weeklyData, monthlyData, allData] = await Promise.all([
         dailyResponse.json(),
         weeklyResponse.json(),
         monthlyResponse.json(),
         allResponse.json()
      ]);

      console.log("All data fetched successfully:", { dailyData, weeklyData, monthlyData, allData });

      setDailyStatus(dailyData.data.indicators.length === 0 ? null : dailyData.data.indicators);
      setWeeklySummery(weeklyData.data === 0 ? null : weeklyData.data ? [weeklyData.data] : []);
      setMonthlySummery(monthlyData.data === 0 ? null : monthlyData.data ? [monthlyData.data] : []);
      setAllSummery(allData.data === 0 ? null : allData.data ? [allData.data] : []);

   } catch (err) {
      console.error("Error fetching agent data:", err);
   }
};

useEffect(() => {
   if (selectedAgentId || user) {
      fetchAgentData(selectedAgentId);
   }
}, [selectedAgentId, login]); 

return (
   <IndicateContext.Provider value={{ createIndicator, dailyStatus, 
      weeklySummery, monthlySummery, allSummery, setSelectedAgentId }}>
      {children}
   </IndicateContext.Provider>
);
}