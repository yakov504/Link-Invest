import React from 'react'
import NavSide from '../NavSide'
import { useIndicate } from '../../../context/IndicateProvider'

export default function PersonalIndicator() {
  const { dailyStatus } = useIndicate()

  // במקרה ואין סטטוסים, מציג הודעה
  if (!dailyStatus || dailyStatus.length === 0) {
    return (
      <div>
        <NavSide />
        <h1>אין סטטוסים</h1>
      </div>
    )
  }

  return (
    <div>
      <NavSide />
      <h1>{dailyStatus[0].agent.name} - {dailyStatus[0].agent.role}</h1> 
      <p>סה"כ סטטוסים שהוכנסו: {dailyStatus.length}</p>

      {/* הצגת טבלה */}
      <table border="1" cellPadding="10" cellSpacing="0">
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
        <tbody>
          {dailyStatus.map(status => (
            <tr key={status._id}>
              <td>{status.meetings}</td>
              <td>{status.deals}</td>
              <td>{status.priceUpdates}</td>
              <td>{status.buyerTours}</td>
              <td>{status.priceOffers}</td>
              <td>{status.exclusives}</td>
              <td>{new Date(status.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
