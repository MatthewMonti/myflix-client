import React from 'react';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ filterText, onFilterTextChange }) => {
  const handleChange = (e) => {
    onFilterTextChange(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        className="searchbar"
        type="text"
        placeholder="Search"
        value={filterText}
        onChange={handleChange}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;