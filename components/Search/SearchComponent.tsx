import React, { useState } from "react";

const SearchComponent = ({
  items,
  selectedCategory,
  onCategoryChange,
  onSearch,
}) => {
  return (
    <div>
      <label>
        Select Category:
        <select value={selectedCategory} onChange={onCategoryChange}>
          <option value="">All</option>
          {items.map((item) => (
            <option key={item} value={item}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
