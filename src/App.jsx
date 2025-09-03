// src/App.jsx
import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32); // like currentCity
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities'); // existing

  const fetchData = async () => {
    const allEvents = await getEvents();

    const filtered =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((e) => e.location === currentCity);

    setEvents(filtered.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  // Rerun like CitySearch, but now also when currentNOE changes
  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className='App'>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />

      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />

      <EventList events={events} />
    </div>
  );
};

export default App;
