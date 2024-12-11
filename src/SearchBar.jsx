import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, setError }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='div-button'>
      <input
        type="text"
        placeholder="Enter title"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className=" search"
      />
      <button className='btns ' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;