import React from 'react';
import './Filter.css';

const cityOptions = [
  'חיפה', 'טירת הכרמל', 'עטלית', 'קריית חיים', 'קריית ים', 'קריית ביאליק', 'קריית מוצקין', 'קריית אתא'
];

const categoryOptions = ['דירה', 'בית', 'אחר'];

const subTypeOptions = [
  'הכל', 'דירה', 'דירת גן', 'גג/ פנטהאוז', 'דופלקס', 'תיירות ונופש', 'מרתף/ פרטר', 'טריפלקס', 'יחידת דיור', 
  'סטודיו/ לופט', 'בית פרטי/ קוטג\'', 'דו משפחתי', 'משק חקלאי/ נחלה', 'משק עזר', 'אחר', 'מגרשים', 'דיור מוגן', 
  'בניין מגורים', 'מחסן', 'חניה', 'קב\' רכישה/ זכות לנכס', 'כללי'
];

const FilterPanel = ({
  tempCities, setTempCities,
  tempCategories, setTempCategories,
  tempSubTypes, setTempSubTypes,
  tempPrice, setTempPrice,
  tempSize, setTempSize,
  tempRooms, setTempRooms,
  resetAll, applyFilters,
  toggleCheckbox
}) => {
  return (
    <div className='filter-panel'>
      {/* בחירת ערים */}
      <div className='filter-dropdown'>
        <span className='filter-title'>בחר עיר</span>
        <div className='dropdown-content'>
          {cityOptions.map((city) => (
            <label key={city} className='checkbox-label'>
              <input 
                type='checkbox' 
                checked={tempCities.includes(city)} 
                onChange={() => toggleCheckbox(city, tempCities, setTempCities)} 
              />
              {city}
            </label>
          ))}
        </div>
      </div>

      {/* בחירת קטגוריות */}
      <div className='filter-dropdown'>
        <span className='filter-title'>קטגוריה</span>
        <div className='dropdown-content'>
          {categoryOptions.map((cat) => (
            <label key={cat} className='checkbox-label'>
              <input 
                type='checkbox' 
                checked={tempCategories.includes(cat)} 
                onChange={() => toggleCheckbox(cat, tempCategories, setTempCategories)} 
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* בחירת תתי-קטגוריות */}
      <div className='filter-dropdown'>
        <span className='filter-title'>תתי-קטגוריות</span>
        <div className='dropdown-content scrollable'>
          {subTypeOptions.map((sub) => (
            <label key={sub} className='checkbox-label'>
              <input 
                type='checkbox' 
                checked={tempSubTypes.includes(sub)} 
                onChange={() => toggleCheckbox(sub, tempSubTypes, setTempSubTypes)} 
              />
              {sub}
            </label>
          ))}
        </div>
      </div>

      {/* טווח מחיר */}
      <div className='filter-dropdown'>
        <span className='filter-title'>טווח מחיר</span>
        <div className='dropdown-content range-inputs'>
          <label>מחיר מינימלי:</label>
          <input 
            type='number' 
            value={tempPrice.min} 
            onChange={(e) => setTempPrice({ ...tempPrice, min: +e.target.value })} 
          />
          <label>מחיר מקסימלי:</label>
          <input 
            type='number' 
            value={tempPrice.max} 
            onChange={(e) => setTempPrice({ ...tempPrice, max: +e.target.value })} 
          />
        </div>
      </div>

      {/* טווח מ"ר */}
      <div className='filter-dropdown'>
        <span className='filter-title'>מ״ר</span>
        <div className='dropdown-content range-inputs'>
          <label>מינימלי:</label>
          <input 
            type='number' 
            value={tempSize.min} 
            onChange={(e) => setTempSize({ ...tempSize, min: +e.target.value })} 
          />
          <label>מקסימלי:</label>
          <input 
            type='number' 
            value={tempSize.max} 
            onChange={(e) => setTempSize({ ...tempSize, max: +e.target.value })} 
          />
        </div>
      </div>

      {/* טווח חדרים */}
      <div className='filter-dropdown'>
        <span className='filter-title'>חדרים</span>
        <div className='dropdown-content range-inputs'>
          <label>מינימלי:</label>
          <input 
            type='number' 
            value={tempRooms.min} 
            onChange={(e) => setTempRooms({ ...tempRooms, min: +e.target.value })} 
          />
          <label>מקסימלי:</label>
          <input 
            type='number' 
            value={tempRooms.max} 
            onChange={(e) => setTempRooms({ ...tempRooms, max: +e.target.value })} 
          />
        </div>
      </div>

      {/* כפתורי פעולה */}
      <div className='filter-buttons'>
        <button className='reset-btn' onClick={resetAll}>איפוס</button>
        <button className='apply-btn' onClick={applyFilters}>אישור</button>
      </div>
    </div>
  );
};

export default FilterPanel;
