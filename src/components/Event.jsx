// src/components/Event.jsx
import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Expecting these keys from your mock-data
  const { summary, created, location, description } = event ?? {};

  return (
    <article className='event'>
      {/* Collapsed info required by the brief/tests */}
      <h2 className='event__title'>{summary}</h2>
      <p className='event__time'>{created}</p>
      <p className='event__location'>{location}</p>

      {/* Toggle details */}
      <button
        type='button'
        aria-expanded={showDetails}
        aria-controls='event-details'
        onClick={() => setShowDetails((s) => !s)}
      >
        {showDetails ? 'Hide details' : 'Show details'}
      </button>

      {showDetails && (
        <div
          id='event-details'
          className='event__details'
          role='region'
          aria-label='Event details'
        >
          <p>{description || 'No additional details.'}</p>
        </div>
      )}
    </article>
  );
};

export default Event;
