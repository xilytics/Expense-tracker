import React, { useEffect, useState } from 'react';
import ExpenseService from '../services/ExpenseService';

const Summary = ({ filters, userId }) => {
  const [total, setTotal] = useState(0);

  const fetchSummary = async () => {
    try {
      const response = await ExpenseService.getSummary({ ...filters, userId });
      setTotal(response.data.total);
    } catch (err) {
      alert('Error fetching summary');
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [filters]);

  return (
    <div>
      <h3>Total Expenses: {total}</h3>
    </div>
  );
};

export default Summary;
