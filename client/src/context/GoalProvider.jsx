import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import { useIndicate } from "./IndicateProvider";

const GoalContext = createContext(undefined);

export const useGoal = () => {
   const goalContext = useContext(GoalContext);
   if (!goalContext) {
      throw new Error("useGoal must be used within goalContext");
    }
    return goalContext;
};

export default function GoalProvider({children}) {
  const { user, setUser, login } = useAuth()
  const {selectedAgentId, setSelectedAgentId} = useIndicate()

  const createGoal = async (formData) => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/goals", {
         method: 'POST',
         credentials: "include",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            ...formData,
            agent: [selectedAgentId] // משתמשים ב-selectedAgentId מה-context
         })
      });

      if (!response.ok) {
         const errorMessage = await response.text();
         throw new Error(`Failed to create goal: ${response.status} - ${errorMessage}`);
      }

      const responseData = await response.json();
      toast.success('היעד נוצר בהצלחה!');
      return responseData;
   } catch (error) {
      toast.error('שגיאה ביצירת יעד');
      console.error('Error creating goal:', error.message);
   }
};

return (
   <GoalContext.Provider value={{ createGoal, setSelectedAgentId, selectedAgentId }}>
      {children}
   </GoalContext.Provider>
);
}