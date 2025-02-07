import './Profile.css';
import { UserContext } from '../../context/UserContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgentProfile() {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);

  // אם המשתמש לא מחובר, ננווט לדף ההתחברות
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate('/login');
  //   }
  // }, [loading, user, navigate]);

  return (
    <div className="agentProfile">
      <h1>agentProfile</h1>
      {/* {loading ? (
        <p>Loading...</p>
      ) : user ? ( */}
        {/* <>
          <h1>ברוכים הבאים, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phone}</p>
          <p>Role: {user.role}</p>
        </> */}
      {/* ) : null} */}
    </div>
  );
}
