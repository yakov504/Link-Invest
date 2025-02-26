import { useState } from 'react';
import NavSide from '../NavSide';
import './PersonalIndicator.css'
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthProvider';
import { useIndicate } from '../../../context/IndicateProvider';
import { FaEdit } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useGoal } from '../../../context/GoalProvider';

export default function PersonalIndicator() {
  const { dailyStatus, weeklySummery, monthlySummery,allSummery } = useIndicate();
  const { user } = useAuth()
  const { agentGoal } = useGoal()
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const [editedGoals, setEditedGoals] = useState([]);

  const handleEditGoals = () => {
    setIsEditing(true);
    setEditedGoals(agentGoal);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(dailyStatus)
  };

  const handleChange = (id, name, value) => {
    const updatedData = editedData.map(item => 
      item._id === id ? { ...item, [name]: value } : item
    );
    setEditedData(updatedData);
  };

  const handleSave = async () => {
    try {
      const promises = editedData.map(async (status) => {
        await fetch(`http://127.0.0.1:3000/api/v1/indicators/${status._id}`, {
          method: 'PATCH',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(status)
        });
      });
      await Promise.all(promises);
      toast.success('כל השינויים נשמרו בהצלחה!');
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating indicators:", error);
      toast.error('שגיאה בשמירת השינויים');
    }
  };

  const handleSaveGoals = async () => {
    try {
       const promises = editedGoals.map(async (goal) => {
          await fetch(`http://127.0.0.1:3000/api/v1/goals/${goal._id}`, {
             method: 'PATCH',
             credentials: "include",
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(goal)
          });
       });
       await Promise.all(promises);
       toast.success('יעדים נשמרו בהצלחה!');
       setIsEditing(false);
    } catch (error) {
       console.error("Error updating goals:", error);
       toast.error('שגיאה בשמירת היעדים');
    }
 };
  
  const mapDaily = dailyStatus && dailyStatus.length > 0 ? dailyStatus.map(status => (
    <tr key={status._id}>
      {isEditing ? (
        <>
          <td><input type="number" name="meetings" value={editedData.find(item => item._id === status._id)?.meetings || ''} onChange={(e) => handleChange(status._id, 'meetings', e.target.value)} /></td>
          <td><input type="number" name="deals" value={editedData.find(item => item._id === status._id)?.deals || ''} onChange={(e) => handleChange(status._id, 'deals', e.target.value)} /></td>
          <td><input type="number" name="priceUpdates" value={editedData.find(item => item._id === status._id)?.priceUpdates || ''} onChange={(e) => handleChange(status._id, 'priceUpdates', e.target.value)} /></td>
          <td><input type="number" name="buyerTours" value={editedData.find(item => item._id === status._id)?.buyerTours || ''} onChange={(e) => handleChange(status._id, 'buyerTours', e.target.value)} /></td>
          <td><input type="number" name="priceOffers" value={editedData.find(item => item._id === status._id)?.priceOffers || ''} onChange={(e) => handleChange(status._id, 'priceOffers', e.target.value)} /></td>
          <td><input type="number" name="exclusives" value={editedData.find(item => item._id === status._id)?.exclusives || ''} onChange={(e) => handleChange(status._id, 'exclusives', e.target.value)} /></td>
        </>
      ) : (
        <>
          <td>{status.meetings}</td>
          <td>{status.deals}</td>
          <td>{status.priceUpdates}</td>
          <td>{status.buyerTours}</td>
          <td>{status.priceOffers}</td>
          <td>{status.exclusives}</td>
        </>
      )}
      <td>{new Date(status.createdAt).toLocaleString()}</td>
    </tr>
  )) : <tr><td colSpan="8">אין נתונים להצגה</td></tr>;

  const mapGoal = agentGoal && agentGoal.length > 0 ? agentGoal.map(goal => (
    <tr key={goal._id}>
      {isEditing ? (
        <>
          <td><input type="number" name="meetings" value={editedData.find(item => item._id === goal._id)?.meetings || ''} onChange={(e) => handleChange(goal._id, 'meetings', e.target.value)} /></td>
          <td><input type="number" name="deals" value={editedData.find(item => item._id === goal._id)?.deals || ''} onChange={(e) => handleChange(goal._id, 'deals', e.target.value)} /></td>
          <td><input type="number" name="priceUpdates" value={editedData.find(item => item._id === goal._id)?.priceUpdates || ''} onChange={(e) => handleChange(goal._id, 'priceUpdates', e.target.value)} /></td>
          <td><input type="number" name="buyerTours" value={editedData.find(item => item._id === goal._id)?.buyerTours || ''} onChange={(e) => handleChange(goal._id, 'buyerTours', e.target.value)} /></td>
          <td><input type="number" name="priceOffers" value={editedData.find(item => item._id === goal._id)?.priceOffers || ''} onChange={(e) => handleChange(goal._id, 'priceOffers', e.target.value)} /></td>
          <td><input type="number" name="exclusives" value={editedData.find(item => item._id === goal._id)?.exclusives || ''} onChange={(e) => handleChange(goal._id, 'exclusives', e.target.value)} /></td>
        </>
      ) : (
        <>
          <td>{goal.meetings}</td>
          <td>{goal.deals}</td>
          <td>{goal.priceUpdates}</td>
          <td>{goal.buyerTours}</td>
          <td>{goal.priceOffers}</td>
          <td>{goal.exclusives}</td>
        </>
      )}
      <td>{new Date(goal.createdAt).toLocaleString()}</td>
    </tr>
  )) : <tr><td colSpan="8">אין נתונים להצגה</td></tr>;

  const mapWeekly = weeklySummery && Array.isArray(weeklySummery) && weeklySummery.length > 0 
    ? weeklySummery.map(week => (
      <tr key={week._id}>
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
        <p className='statusNum'>סה"כ סטטוסים יומיים שהוכנסו: {dailyStatus.length}</p>
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
        {!isEditing ? (
          user.role === 'admin' ? ( 
            <button className='editBtn' onClick={handleEdit}>
              <FaEdit className='icon'/> ערוך הכל
            </button>
          ): null
        ) : (
          <button className='editBtn' onClick={handleSave}>
            <MdOutlinePublishedWithChanges className='icon'/> שמור את כל השינויים
          </button>
        )}
      </div>
      <div className='agentGoal'>
        <h2>יעד חודשי</h2>
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th> יעד מפגשים</th>
              <th>יעד עסקאות</th>
              <th>יעד עדכוני מחיר</th>
              <th> יעד סיורים לקונים</th>
              <th> יעד הצעות מחיר</th>
              <th> יעד חוזים בלעדיים</th>
              <th> יעד תאריך יצירה</th>
            </tr>
          </thead>
          <tbody>{mapGoal}</tbody>
        </table>
        {!isEditing ? (
          user.role === 'admin' ? ( 
            <button className='editBtn' onClick={handleEditGoals}>
              <FaEdit className='icon'/> ערוך הכל
            </button>
          ): null
        ) : (
          <button className='editBtn' onClick={handleSaveGoals}>
            <MdOutlinePublishedWithChanges className='icon'/> שמור יעדים
          </button>
        )}
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
