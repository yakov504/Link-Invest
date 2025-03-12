import {useState} from 'react'
import "./Property.css";
import { useProperty } from '../../context/PropertyProvider'
import logo from '../../assets/image/link_logo.png'

export default function Sale() {
  const { properties } = useProperty();

  const mapProperty = properties.map(property => (
    <div key={property._id} className='propertyData'>
      <div className='propertyDetiels'>
        <img src={logo} alt="image" />
        <h2>{property.category} ב{property.address}, {property.city}</h2>
        <h3>{property.price} ₪</h3>
        <p>סוג נכס:</p>
        <ul>
          {property.subTypes.map((sud, index) => (
            <li key={index}>{sud}</li>
          ))}
        </ul>
        <p>{property.typeTransaction}</p>
        <p>{property.agent.role}</p>
        <p>{property.agent.phone_number}</p>
        <p>{property.descrption}</p>
        <p>תכונות:</p>
        <ul>
          {property.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  ));

  return (
    <div>
      <h1 className='head'>הנכסים למכירה שלנו</h1>
      {properties.length === 0 ? (
          <p>אין נכסים למכירה</p>
        ) : (
          <p>סה"כ נכסים: {properties.length}</p>
        )}
      <div className='propertyContainer'>
        {mapProperty}
      </div>
    </div>
  );
  }
