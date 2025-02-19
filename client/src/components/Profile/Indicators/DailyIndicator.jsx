import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { useIndicate } from '../../../context/IndicateProvider'
import './DailyIndi.css'

export default function DailyIndicator() {
  const { createIndicator, error } = useIndicate()
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

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      if (!user) {
        console.error("User not found!");
        return;
      }
      console.log("🔹 שולח נתונים לשרת:", { ...formData, agent: user.id });
      await createIndicator(formData); // קריאה לפונקציה מה-Provider
      // איפוס הטופס לאחר שליחת הנתונים
      setFormData({
        meetings: "",
        exclusives: "",
        priceUpdates: "",
        buyerTours: "",
        priceOffers: "",
        deals: ""
      });
    }catch(error){
      return console.log('error message',error);
    }
  };

  // const handleChange = async(e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

    // const newIndicator = {
    //   ...formData,
    //   agent: user.id // הוספת ה-user.id לאובייקט הנתונים
    // };
  return (
    <div className="dailyIndicators">
      <h1>הזנת נתונים יומיים</h1>
      <form className="dailyForm" onSubmit={handleSubmit}>
        <div className="dailyInputs">
          <input type="number" name="meetings" placeholder="פגישות" value={formData.meetings} onChange={handleInput} />
          <input type="number" name="exclusives" placeholder="בלעדיים" value={formData.exclusives} onChange={handleInput} />
          <input type="number" name="priceUpdates" placeholder="עדכוני מחיר" value={formData.priceUpdates} onChange={handleInput} />
          <input type="number" name="buyerTours" placeholder="סיורים לקונים" value={formData.buyerTours} onChange={handleInput} />
          <input type="number" name="priceOffers" placeholder="הצעות מחיר" value={formData.priceOffers} onChange={handleInput} />
          <input type="number" name="deals" placeholder="סגירת עסקאות" value={formData.deals} onChange={handleInput} />
          {error && <p className="error-message">{error}</p>}
          <button className="dailyStatusBtn" type="submit">הכנס נתונים</button>
        </div>
      </form>
    </div>
  );
}