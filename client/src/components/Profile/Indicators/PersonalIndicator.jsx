import React from 'react';
import NavSide from '../NavSide';
import './PersonalIndicator.css'
import { useIndicate } from '../../../context/IndicateProvider';

export default function PersonalIndicator() {
  const { dailyStatus, weeklySummery, monthlySummery, allSummery } = useIndicate();

  const mapDaily = dailyStatus && dailyStatus.length > 0 ? dailyStatus.map(status => (
    <tr key={status._id}>
      <td>{status.meetings}</td>
      <td>{status.deals}</td>
      <td>{status.priceUpdates}</td>
      <td>{status.buyerTours}</td>
      <td>{status.priceOffers}</td>
      <td>{status.exclusives}</td>
      <td>{new Date(status.createdAt).toLocaleString()}</td>
    </tr>
  )) : <tr><td colSpan="7">אין נתונים להצגה</td></tr>;

  const mapWeekly = weeklySummery && Array.isArray(weeklySummery) && weeklySummery.length > 0 
    ? weeklySummery.map(week => (
      <tr key={week._id.agentId}>
        <td>{week.totalMeetings}</td>
        <td>{week.totalDeals}</td>
        <td>{week.totalPriceUpdates}</td>
        <td>{week.totalBuyerTours}</td>
        <td>{week.totalPriceOffers}</td>
        <td>{week.totalExclusives}</td>
      </tr>
    )) : <tr><td colSpan="6">אין נתונים להצגה</td></tr>;

  const mapMonthly = monthlySummery && Array.isArray(monthlySummery) && monthlySummery.length > 0 
    ? monthlySummery.map(month => (
      <tr key={month._id}>
        <td>{month.totalMeetings}</td>
        <td>{month.totalDeals}</td>
        <td>{month.totalPriceUpdates}</td>
        <td>{month.totalBuyerTours}</td>
        <td>{month.totalPriceOffers}</td>
        <td>{month.totalExclusives}</td>
      </tr>
    )) : <tr><td colSpan="6">אין נתונים להצגה</td></tr>;

  const mapAll = allSummery && Array.isArray(allSummery) && allSummery.length > 0 
    ? allSummery.map(all => (
      <tr key={all._id}>
        <td>{all.totalMeetings}</td>
        <td>{all.totalDeals}</td>
        <td>{all.totalPriceUpdates}</td>
        <td>{all.totalBuyerTours}</td>
        <td>{all.totalPriceOffers}</td>
        <td>{all.totalExclusives}</td>
      </tr>
    )) : <tr><td colSpan="6">אין נתונים להצגה</td></tr>;

  return (
    <div>
      <NavSide />
      {dailyStatus && dailyStatus.length > 0 ? (
        <>
          <h1 className='headStatus'>מדדים {dailyStatus[0]?.agent[0]?.name} - {dailyStatus[0]?.agent[0]?.role}</h1>
          <p className='statusNum'>סה"כ סטטוסים שהוכנסו: {dailyStatus.length}</p>
        </>
      ) : (
        <p>אין סטטוסים</p>
      )}
     <div className='indicatorContainer'>
      <div className='dailyStatus'>
        <h2>סטטוס יומי</h2>
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>מפגשים</th>
              <th>עסקאות</th>
              <th>עדכוני מחיר</th>
              <th>סיורים לקונים</th>
              <th>הצעות מחיר</th>
              <th>חוזים בלעדיים</th>
              <th>תאריך יצירה</th>
            </tr>
          </thead>
          <tbody>{mapDaily}</tbody>
        </table>
      </div>

      <div className='weeklySummery'>
        <h2>סיכום שבועי</h2>
        <table border="1" cellPadding="7" cellSpacing="0">
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
          <tbody>{mapWeekly}</tbody>
        </table>
      </div>

      <div className='monthlySummery'>
        <h2>סיכום חודשי</h2>
        <table border="1" cellPadding="7" cellSpacing="0">
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
          <tbody>{mapMonthly}</tbody>
        </table>
      </div>

      <div className='allSummery'>
        <h2>סיכום כולל</h2>
        <table border="1" cellPadding="7" cellSpacing="0">
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
          <tbody>{mapAll}</tbody>
        </table>
      </div>
     </div>
    </div>
  );
}
