import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import './DailyIndi.css'

export default function DailyIndicator() {
  const { user } = useAuth();
  // const [dailyData, setDailyData] = useState([]);
  const [formData, setFormData] = useState({
    meetings: "",
    exclusives: "",
    priceUpdates: "",
    buyerTours: "",
    priceOffers: "",
    deals: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  return (
    <div className="dailyIndicators">
      <h1>הזנת נתונים יומיים</h1>
      <form className="dailyForm">
        <div className="dailyInputs">
          <input type="number" name="meetings" placeholder="פגישות " value={formData.meetings} onChange={handleChange}/>
          <input type="number" name="exclusives" placeholder="בלעדיים " value={formData.exclusives} onChange={handleChange}/>
          <input type="number" name="priceUpdates" placeholder="עדכוני מחיר" value={formData.priceUpdates} onChange={handleChange}/>
          <input type="number" name="buyerTours" placeholder="סיורים לקונים" value={formData.buyerTours} onChange={handleChange}/>
          <input type="number" name="priceOffers" placeholder="הצעות מחיר" value={formData.priceOffers} onChange={handleChange}/>
          <input type="number" name="deals" placeholder="סגירת עסקאות" value={formData.deals} onChange={handleChange} />
          <button className="dailyStatusBtn">הכנס נתונים</button>
        </div>
      </form>
    </div>
  );
}
