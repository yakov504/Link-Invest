import React, { useState } from 'react';
import NavSide from '../NavSide';
import { useGoal } from '../../../context/GoalProvider';
import { toast } from 'react-toastify';

export default function Performance() {
  const { allAgentsPerformance, companyPerformance, fetchAllAgentsPerformance, fetchCompanyPerformance } = useGoal();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleDateChange = async () => {
    try {
      await fetchAllAgentsPerformance(year, month);
      await fetchCompanyPerformance(year, month);
      toast.success('הנתונים עודכנו בהצלחה!');
    } catch (error) {
      toast.error('שגיאה בעדכון הנתונים');
    }
  };

  return (
    <div>
      <NavSide />
      <div>
        <h2>ביצועי משרד</h2>
        {/* Date Picker */}
        <div style={{ margin: '20px 0' }}>
          <label htmlFor="year">בחר שנה:</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ marginRight: '10px' }}
          >
            {[...Array(10).keys()].map((i) => {
              const yearOption = new Date().getFullYear() - i;
              return (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              );
            })}
          </select>
          <label htmlFor="month">בחר חודש:</label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button onClick={handleDateChange} style={{ marginLeft: '10px' }}>
            עדכן נתונים
          </button>
        </div>
        {/* All Agents Performance Table */}
        {allAgentsPerformance && (
          <div>
            <h3>ביצועי סוכני מכירות</h3>
            <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th>שם סוכן</th>
                  <th>פגישות</th>
                  <th>בלעדיות</th>
                  <th>עדכוני מחיר</th>
                  <th>סיורי קונים</th>
                  <th>הצעות מחיר</th>
                  <th>עסקאות</th>
                </tr>
              </thead>
              <tbody>
                {allAgentsPerformance.map((agent) => (
                  <tr key={agent.agentName}>
                    <td>{agent.agentName}</td>
                    <td>{agent.meetings.actual} / {agent.meetings.goal} ({agent.meetings.percentage}%)</td>
                    <td>{agent.exclusives.actual} / {agent.exclusives.goal} ({agent.exclusives.percentage}%)</td>
                    <td>{agent.priceUpdates.actual} / {agent.priceUpdates.goal} ({agent.priceUpdates.percentage}%)</td>
                    <td>{agent.buyerTours.actual} / {agent.buyerTours.goal} ({agent.buyerTours.percentage}%)</td>
                    <td>{agent.priceOffers.actual} / {agent.priceOffers.goal} ({agent.priceOffers.percentage}%)</td>
                    <td>{agent.deals.actual} / {agent.deals.goal} ({agent.deals.percentage}%)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Company Performance Table */}
        {companyPerformance && (
          <div>
            <h3>ביצועים כלליים של המשרד</h3>
            <table border="1" cellPadding="10" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>הכנסות</th>
                  <th>מכירות</th>
                  <th>הישגים</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{companyPerformance.revenue}</td>
                  <td>{companyPerformance.sales}</td>
                  <td>{companyPerformance.performance}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}