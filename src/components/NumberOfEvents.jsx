import React, { useState } from 'react';

const NumberOfEvents = ({ defaultValue = 32, onChange }) => {
  const [value, setValue] = useState(String(defaultValue));

  const handleChange = (e) => {
    const next = e.target.value;
    setValue(next);
    if (onChange) onChange(next);
  };

  return (
    <div id='number-of-events'>
      <label>
        Number of events
        <input
          aria-label='Number of events'
          type='text' // role = textbox (per exercise)
          value={value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default NumberOfEvents;
