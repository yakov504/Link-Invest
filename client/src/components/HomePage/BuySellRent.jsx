import React, { useState } from 'react';

export default function BuySellRent() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'buy'
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.log('Failed to send email.');
      }
    } catch (error) {
      console.log('An error occurred while sending the email.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 shadow-lg rounded-2xl">
      <div>
        <h2 className="text-xl font-bold mb-4 text-center">צרו קשר!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="שם מלא"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="מספר טלפון"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="buy">קונה</option>
            <option value="sell">מוכר</option>
            <option value="rent">משכיר</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            שלח פרטים!
          </button>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            לדף שלנו ביד 2
          </button>
        </form>
      </div>
    </div>
  );
}
    