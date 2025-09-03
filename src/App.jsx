// src/App.jsx
// src/App.jsx
import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api'; // <- make sure extractLocations is exported
import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities'); // default per brief

  const fetchData = async () => {
    const allEvents = await getEvents();

    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents)); // keep superset of locations
  };

  // Re-run when currentCity changes (and on mount)
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCity]);

  return (
    <div className='App'>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity} // <-- pass the setter to child
      />
      <NumberOfEvents />
      <EventList events={events} />
    </div>
  );
};

export default App;
