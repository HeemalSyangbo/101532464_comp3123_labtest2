import React from 'react';

function WeatherSearch({ city, onCityChange, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default WeatherSearch;
