import React, { useState } from 'react';
import './BuySell.css'
import { toast } from 'react-toastify';
import rent from '../../assets/image/buy1.jpg'

export default function BuySellRent() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: ''
  });

  const [ isClicked, setIsClicked ] = useState(false)

  const phoneNumberPattern = /^(?:\+?972|0)?[-.\s]?(5[0-9])[-.\s]?\d{3}[-.\s]?\d{4}$/;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumberPattern.test(formData.phone)) {
      toast.error('מספר הטלפון אינו תקין, נסה שוב.');
      return;
    }
    
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/email/send-mail", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('הפרטים נשלחו בהצלחה!')
        setFormData({ name: '', phone: '', category: '' });
        setIsClicked(true)
      } else {
        toast.error("שגיאה! משהו השתבש...")
      }
    } catch (error) {
      toast.error("שגיאה! משהו השתבש...")
      console.log('An error occurred while sending the email.');
    }
  };

  return (
  <div className="buySellForm">
    <div className="buySellText">
      <h2>השאירו פרטים וניצור איתכם קשר</h2>
      <div className="yad2">
        <p>או לחצו לעמוד שלנו באתר יד 2</p>
        <button className="yad2Btn" onClick={() => 
          window.open('https://www.yad2.co.il/realestate/agency/4089059/forsale', '_blank')}>
          לדף שלנו ביד 2
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input type="text" name="name" placeholder="שם מלא" value={formData.name} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="מספר טלפון" value={formData.phone} onChange={handleChange} required />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="קונה">קונה</option>
            <option value="מוכר">מוכר</option>
            <option value="משכיר">משכיר</option>
          </select>
        </div>
        <button className={ isClicked? "sendBtn" : "sendBtn block"} 
          type="submit"  disabled={isClicked} >שלח פרטים!
        </button>
      </form>
    </div>
    <img src={rent} alt="nice pic" />
  </div>

  );
}
    