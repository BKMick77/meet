import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations = [], setCurrentCity = () => {} }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // hide the list
    setCurrentCity(value); // safe even if parent didn't pass it
  };

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(value.toUpperCase())
        )
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]); // ← fixed

  return (
    <div id='city-search'>
      <input
        type='text'
        className='city'
        placeholder='Search for a city'
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className='suggestions'>
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
