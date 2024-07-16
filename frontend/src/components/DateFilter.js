import React, { useState } from 'react';

const DateFilter = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ startDate, endDate });
  };

  return (
    <div>
      <h3>Date Filter</h3>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleFilterChange}>Apply</button>
    </div>
  );
};

export default DateFilter;
