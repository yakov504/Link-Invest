import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

const AgentContext = createContext(undefined);

export const useAgent = () => {
   const agentContext = useContext(AgentContext);
   if (!agentContext) {
      throw new Error("useAgent must be used within AgentProvider");
    }
    return agentContext;
}

export default function AgentProvider({children}){
   const [agents, setAgents] = useState();
   const location = useLocation();
   
   const allAgents = async() => {
      try{
         const response = await fetch("http://127.0.0.1:3000/api/v1/users",{
            method: 'GET',
            credentials: "include", // שולח את ה-cookie עם הבקשה
            headers: {
               'Content-Type': 'application/json'
         }
         })
         if (!response.ok) {
            throw new Error("User not authenticated");
         }
  
         const responseData = await response.json();
         // console.log(responseData);
         setAgents(responseData.data.data);
         return { success: true};
      }catch(err){
         toast.error('משהו השתבש נסה שוב');
         console.log(err);
         return { success: false, message: err.message };
      }
   }

   useEffect(() => {
      if (location.pathname === "/AgentProfile") {
        const fetchAgents = async () => {
          const result = await allAgents();
          if (result.success) {
            // console.log(agents);
            // setAgents(result.responseData.data.data);
          } else {
            console.error(result.message);
          }
        };
    
        fetchAgents();
      }
    }, [location.pathname]);

   return (
      <AgentContext.Provider value={{agents}}>
        {children}
      </AgentContext.Provider>
   
  );
}