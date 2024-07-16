import React, { useState } from 'react';

const CategoryFilter = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(
      selectedCategories.includes(value)
        ? selectedCategories.filter((cat) => cat !== value)
        : [...selectedCategories, value]
    );
  };

  const handleFilterChange = () => {
    onFilterChange({ categories: selectedCategories.join(',') });
  };

  return (
    <div>
      <h3>Category Filter</h3>
      {categories.map((category) => (
        <label key={category}>
          <input
            type="checkbox"
            value={category}
            onChange={handleCategoryChange}
          />
          {category}
        </label>
      ))}
      <button onClick={handleFilterChange}>Apply</button>
    </div>
  );
};

export default CategoryFilter;
