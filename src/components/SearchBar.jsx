import React from 'react';
import '../styles/HomePage.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-box-container">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for food..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;