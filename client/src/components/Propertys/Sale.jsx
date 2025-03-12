import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyProvider';
import logo from '../../assets/image/link_logo.png';
import FilterPanel from './FilterPanel';
import './Property.css'

export default function Sale() {
  const { properties } = useProperty();

  // סטייט זמני עבור פילטרים (לפני אישור)
  const [tempCities, setTempCities] = useState([]);
  const [tempCategories, setTempCategories] = useState([]);
  const [tempSubTypes, setTempSubTypes] = useState([]);
  const [tempPrice, setTempPrice] = useState({ min: 0, max: 20000000 });
  const [tempSize, setTempSize] = useState({ min: 0, max: 500 });
  const [tempRooms, setTempRooms] = useState({ min: 1, max: 10 });

  // סטייט סופי של הפילטרים (אחרי אישור)
  const [filters, setFilters] = useState({
    cities: [],
    categories: [],
    subTypes: [],
    priceMin: 0,
    priceMax: 20000000,
    sizeMin: 0,
    sizeMax: 500,
    roomsMin: 1,
    roomsMax: 10,
  });

  // פונקציה לטוגל צ'קבוקס (הוספה/הסרה)
  const toggleCheckbox = (value, currentArray, setFunc) => {
    if (currentArray.includes(value)) {
      setFunc(currentArray.filter((v) => v !== value));
    } else {
      setFunc([...currentArray, value]);
    }
  };

  // איפוס סטייט זמני
  const resetTempFilters = () => {
    setTempCities([]);
    setTempCategories([]);
    setTempSubTypes([]);
    setTempPrice({ min: 0, max: 20000000 });
    setTempSize({ min: 0, max: 500 });
    setTempRooms({ min: 1, max: 10 });
  };

  // איפוס כל הפילטרים (זמני וסופי)
  const resetAll = () => {
    resetTempFilters();
    setFilters({
      cities: [],
      categories: [],
      subTypes: [],
      priceMin: 0,
      priceMax: 20000000,
      sizeMin: 0,
      sizeMax: 500,
      roomsMin: 1,
      roomsMax: 10,
    });
  };

  // העברת הפילטרים מהסטייט הזמני לסופי
  const applyFilters = () => {
    setFilters({
      cities: tempCities,
      categories: tempCategories,
      subTypes: tempSubTypes,
      priceMin: tempPrice.min,
      priceMax: tempPrice.max,
      sizeMin: tempSize.min,
      sizeMax: tempSize.max,
      roomsMin: tempRooms.min,
      roomsMax: tempRooms.max,
    });
  };

  // סינון הנכסים על פי הפילטרים הסופיים
  const filteredProperties = properties.filter((property) => {
    if (filters.cities.length > 0 && !filters.cities.includes(property.city)) {
      return false;
    }
    if (filters.categories.length > 0 && !filters.categories.includes(property.category)) {
      return false;
    }
    if (filters.subTypes.length > 0) {
      const intersection = property.subTypes.filter((sub) => filters.subTypes.includes(sub));
      if (intersection.length === 0) {
        return false;
      }
    }
    if (property.price < filters.priceMin || property.price > filters.priceMax) {
      return false;
    }
    if (property.size < filters.sizeMin || property.size > filters.sizeMax) {
      return false;
    }
    if (property.rooms < filters.roomsMin || property.rooms > filters.roomsMax) {
      return false;
    }
    return true;
  });

  return (
    <div className='propertyContainer'>
      <h1 className='head'>הנכסים למכירה שלנו</h1>
      <FilterPanel
        tempCities={tempCities} setTempCities={setTempCities}
        tempCategories={tempCategories} setTempCategories={setTempCategories}
        tempSubTypes={tempSubTypes} setTempSubTypes={setTempSubTypes}
        tempPrice={tempPrice} setTempPrice={setTempPrice}
        tempSize={tempSize} setTempSize={setTempSize}
        tempRooms={tempRooms} setTempRooms={setTempRooms}
        resetAll={resetAll} applyFilters={applyFilters}
        toggleCheckbox={toggleCheckbox}
      />
      {filteredProperties.length === 0 ? (
        <p>אין נכסים התואמים את הסינון</p>
      ) : (
        <p>סה"כ נכסים: {filteredProperties.length}</p>
      )}
      <div className='propertyCards'>
        {filteredProperties.map((property) => (
          <div key={property._id} className='propertyData'>
            <div className='propertyDetiels'>
              <img src={logo} alt='logo' className='logo' />
              <h2>{property.category} ב{property.address}, {property.city}</h2>
              <h3>{property.price} ₪</h3>
              <p>גודל: {property.size} מ"ר | חדרים: {property.rooms}</p>
              <p>סוג נכס: {property.subTypes.join(', ')}</p>
              <p>{property.typeTransaction}</p>
              <p>{property.descrption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
