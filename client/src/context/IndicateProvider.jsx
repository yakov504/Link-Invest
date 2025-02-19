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
   const { user } = useAuth()
   const [ error, setError ] = useState(null)
   
   const createIndicator = async(meetings, exclusives, priceUpdates, buyerTours, priceOffers,deals, agent) => {
      try{
         if (!user) {
            setError("משתמש לא נמצא! לא ניתן ליצור אינדיקטור.");
            console.error("User not found. Unable to create an indicator.");
            return;
         }
         
         const response = await fetch("http://127.0.0.1:3000/api/v1/indicators",{
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            meetings: meetings,
            exclusives: exclusives,
            priceUpdates: priceUpdates,
            buyerTours: buyerTours,
            priceOffers: priceOffers,
            deals: deals,
            agent: user.id 
         })
      })
      const data = await response.json();
      
      if (!response.ok) {
         const errorMessage = await response.text();
         throw new Error(`Failed to create indicator: ${response.status} - ${errorMessage}`);
      }
         console.log("Indicator created:", data);
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