import React, { useState } from 'react';
import {FaSearch} from "react-icons/fa";

const SearchBar = ({ filterText, onFilterTextChange }) => {
  const handleChange = (e) => {
    onFilterTextChange(e.target.value);
  };

  return (
    <div className="search-container">
      <FaSearch id="search-icon"/>
        <input
          className="searchbar"
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
