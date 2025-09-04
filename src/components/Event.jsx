import React, { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="event" role="listitem">
      <h2 className="event__title">{event.summary}</h2>
      <p className="event__time">{event.created}</p>
      <p className="event__location">{event.location}</p>

      <button
        className="details__btn"
        onClick={() => setShowDetails(!showDetails)}
        aria-expanded={showDetails}
        aria-controls={`details-${event.id}`}
      >
        {showDetails ? "Hide details" : "Show details"}
      </button>

      {showDetails && (
        <div
          className="event__details"
          role="region"
          id={`details-${event.id}`}
        >
          <p>{event.description || "No additional details."}</p>
        </div>
      )}
    </article>
  );
};

export default Event;
