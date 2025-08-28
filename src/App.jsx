// src/App.jsx
import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'; // <-- default import

const App = () => {
  return (
    <div className='App'>
      <CitySearch />
      <EventList />
      <NumberOfEvents />
    </div>
  );
};

export default App;
