import { useState, useP } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider'
import { useGoal } from '../../../context/GoalProvider'
import { toast } from 'react-toastify'
import './Goals.css'
import NavSide from '../NavSide'

export default function AdminGoals() {
  const { agentId } = useParams()
  const { createGoal } = useGoal()

  const [formData, setFormData] = useState({
    meetings: 0,
    exclusives: 0,
    priceUpdates: 0,
    buyerTours: 0,
    priceOffers: 0,
    deals: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGoal(formData, agentId); // שולחים את ה-agentId
    } catch (error) {
     console.log(error);
     
    }
  };

  return (
   <div>
      {/* <NavSide/> */}
      <div className="monthlyGoals">
        <h1>הזנת יעדים חודשיים</h1>
          <form onSubmit={handleSubmit}>
            <div className="goalInputs">
              <input type="number" name="meetings" onChange={handleChange} placeholder="מפגשים" />
              <input type="number" name="deals" onChange={handleChange} placeholder="עסקאות" />
              <input type="number" name="priceUpdates" onChange={handleChange} placeholder="עדכוני מחיר" />
              <input type="number" name="buyerTours" onChange={handleChange} placeholder="סיורים" />
              <input type="number" name="priceOffers" onChange={handleChange} placeholder="הצעות מחיר" />
              <input type="number" name="exclusives" onChange={handleChange} placeholder="חוזים בלעדיים" />
              <button className='goalBtn' type="submit">שמור יעד</button>
            </div>
        </form>
      </div>
    </div>
  )
}
