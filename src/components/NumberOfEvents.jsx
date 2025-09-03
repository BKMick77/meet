import React, { useState, useEffect } from 'react';

const NumberOfEvents = ({ currentNOE = 32, setCurrentNOE = () => {} }) => {
  // like CitySearchs query
  const [value, setValue] = useState(String(currentNOE));

  useEffect(() => {
    setValue(String(currentNOE));
  }, [currentNOE]);

  const handleInputChanged = (e) => {
    const next = e.target.value;
    setValue(next);

    const parsed = parseInt(next, 10);
    setCurrentNOE(Number.isNaN(parsed) ? 0 : parsed);
  };

  return (
    <div id='number-of-events'>
      <label>
        Number of events
        <input
          aria-label='Number of events'
          type='text'
          value={value}
          onChange={handleInputChanged}
        />
      </label>
    </div>
  );
};

export default NumberOfEvents;
