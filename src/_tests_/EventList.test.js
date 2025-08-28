import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  test('has an element with "list" role', () => {
    // Your component renders <ul id="event-list">, which has role="list"
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    const { container, rerender } = EventListComponent;

    rerender(<EventList events={allEvents} />);

    // Count the actual structure your component renders:
    // <ul id="event-list"> with direct <article class="event"> children
    const articles = container.querySelectorAll('#event-list > article.event');
    expect(articles).toHaveLength(allEvents.length);
  });
});
