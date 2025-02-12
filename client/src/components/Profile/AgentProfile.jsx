import "./Profile.css";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";

export default function AgentProfile() {
  const { user, getNewAccessToken } = useAuth();

  useEffect(() => {
    if (!user) {
      getNewAccessToken(); // אם אין יוזר, מנסה להביא טוקן חדש
    }
  }, [user]);

  if (!user) return <p>טוען...</p>;

  return (
    <div className="agentProfile">
      <h1>ברוכים הבאים, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phone}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}