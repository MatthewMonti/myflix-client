import React from "react";

const SearchBar = ({ filterText, onFilterTextChange }) => {
  return (
    <form>
      <br />
      <input
        className="searchbar"
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <br />
    </form>
  );
};

export default SearchBar;
