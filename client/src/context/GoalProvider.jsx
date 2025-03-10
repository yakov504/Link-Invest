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

export default function GoalProvider({ children }) {
    const { user, setUser, login } = useAuth();
    const { selectedAgentId, setSelectedAgentId } = useIndicate();
    const [agentGoal, setAgentGoal] = useState(null);
    const [allAgentsPerformance, setAllAgentsPerformance] = useState(null);
    const [singleAgentPerformance, setSingleAgentPerformance] = useState(null);
    const [companyPerformance, setCompanyPerformance] = useState(null);

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
                    agent: [selectedAgentId]
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

    const fetchGoal = async (agentId) => {
        const agent = agentId || user._id;
        try {
            const goalResponse = await fetch("http://127.0.0.1:3000/api/v1/goals/getGoalByagentGoal", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: { agent } })
            });
            if (!goalResponse.ok) {
                throw new Error("One or more requests failed");
            }
            const goalData = await goalResponse.json();
            setAgentGoal(goalData.data.goals || []);
            return { success: true };
        } catch (err) {
            console.log(err);
        }
    };

    const fetchAllAgentsPerformance = async (year, month) => {
        try {
            const url = `http://127.0.0.1:3000/api/v1/performance/all?year=${year || new Date().getFullYear()}&month=${month || new Date().getMonth() + 1}`;
            const response = await fetch(url, {
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch all agents performance");
            }
            const data = await response.json();
            setAllAgentsPerformance(data.data);
        } catch (error) {
            console.error('Error fetching all agents performance:', error);
        }
    };

    const fetchSingleAgentPerformance = async (agentId, year, month) => {
        try {
            const url = `http://127.0.0.1:3000/api/v1/performance/${agentId}?year=${year || new Date().getFullYear()}&month=${month || new Date().getMonth() + 1}`;
            const response = await fetch(url, {
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch single agent performance");
            }
            const data = await response.json();
            setSingleAgentPerformance(data.data);
        } catch (error) {
            console.error('Error fetching single agent performance:', error);
        }
    };

    const fetchCompanyPerformance = async (year, month) => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/v1/companyPerformance?year=${year || new Date().getFullYear()}&month=${month || new Date().getMonth() + 1}`, {
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch company performance");
            }
            const data = await response.json();
            setCompanyPerformance(data.data);
        } catch (error) {
            console.error('Error fetching company performance:', error);
        }
    };

    useEffect(() => {
        if (selectedAgentId || user) {
            fetchGoal(selectedAgentId);
            fetchAllAgentsPerformance();
            if (selectedAgentId) {
                fetchSingleAgentPerformance(selectedAgentId);
            }
        }
    }, [selectedAgentId, login]);

    useEffect(() => {
        fetchCompanyPerformance();
    }, [login]);

    return (
        <GoalContext.Provider value={{
            createGoal,
            setSelectedAgentId,
            selectedAgentId,
            agentGoal,
            allAgentsPerformance,
            singleAgentPerformance,
            companyPerformance,
            fetchAllAgentsPerformance,
            fetchSingleAgentPerformance,
            fetchCompanyPerformance
        }}>
            {children}
        </GoalContext.Provider>
    );
}