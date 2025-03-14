import React from 'react';
import { useGoal } from '../../../context/GoalProvider';
import { useIndicate } from '../../../context/IndicateProvider';

const AgentMonthlyGoalSummary = () => {
  const { monthlySummery } = useIndicate();
  const { agentGoal } = useGoal();

  return (
    <div className='agentGoalSummary'>
      <div className='agentGoal'>
        <h2>יעד חודשי</h2>
        <table border='1' cellPadding='5' cellSpacing='0'>
          <thead>
            <tr>
              <th>יעד מפגשים</th>
              <th>יעד עסקאות</th>
              <th>יעד עדכוני מחיר</th>
              <th>יעד סיורים לקונים</th>
              <th>יעד הצעות מחיר</th>
              <th>יעד חוזים בלעדיים</th>
              <th>יעד תאריך יצירה</th>
            </tr>
          </thead>
          <tbody>
            {agentGoal && agentGoal.length > 0 ? (
              agentGoal.map((goal, index) => (
                <tr key={index}>
                  <td>{goal.meetings}</td>
                  <td>{goal.deals}</td>
                  <td>{goal.priceUpdates}</td>
                  <td>{goal.buyerTours}</td>
                  <td>{goal.priceOffers}</td>
                  <td>{goal.exclusiveContracts}</td>
                  <td>{goal.creationDate}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7">אין נתונים להצגה</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='monthlySummary'>
        <h2>סיכום חודשי</h2>
        <table border='1' cellPadding='7' cellSpacing='0'>
          <thead>
            <tr>
              <th>מפגשים</th>
              <th>עסקאות</th>
              <th>עדכוני מחיר</th>
              <th>סיורים לקונים</th>
              <th>הצעות מחיר</th>
              <th>חוזים בלעדיים</th>
            </tr>
          </thead>
          <tbody>
            {monthlySummery && monthlySummery.length > 0 ? (
              monthlySummery.map((summary, index) => (
                <tr key={index}>
                  <td>{summary.meetings}</td>
                  <td>{summary.deals}</td>
                  <td>{summary.priceUpdates}</td>
                  <td>{summary.buyerTours}</td>
                  <td>{summary.priceOffers}</td>
                  <td>{summary.exclusiveContracts}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">אין נתונים להצגה</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentMonthlyGoalSummary;