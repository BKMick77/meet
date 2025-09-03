// src/__tests__/App.test.js
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../api', () => {
  const original = jest.requireActual('../api');
  return {
    ...original,
    getEvents: jest.fn().mockResolvedValue(require('../mock-data').default),
  };
});

import React from 'react';
import App from './../App';
import mockData from '../mock-data';

describe('<App /> component', () => {
  test('renders list of events', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#city-search')).toBeInTheDocument();
  });

  test('App renders the NumberOfEvents component', () => {
    const { container } = render(<App />);
    const noe = container.firstChild.querySelector('#number-of-events');
    expect(noe).toBeInTheDocument();
  });

  describe('<App /> intergration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);

      const CitySearchDOM = container.querySelector('#city-search');
      const CitySearchInput = within(CitySearchDOM).getByRole('textbox');

      await user.type(CitySearchInput, 'Berlin');
      const berlinSuggestionItem =
        within(CitySearchDOM).getByText('Berlin, Germany');
      await user.click(berlinSuggestionItem);

      const EventListDOM = container.querySelector('#event-list');

      await waitFor(() => {
        const items = within(EventListDOM).getAllByRole('listitem');
        const berlinEvents = mockData.filter(
          (event) => event.location === 'Berlin, Germany'
        );
        expect(items.length).toBe(berlinEvents.length);
        items.forEach((li) =>
          expect(li.textContent).toContain('Berlin, Germany')
        );
      });
    });

    test('user can change the number of events displayed', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);

      // If this still finds 2 inputs, it means App renders NumberOfEvents twice.
      const inputs = within(container).getAllByRole('textbox', {
        name: /number of events/i,
      });
      const numberInput = inputs[0];

      await user.type(numberInput, '{backspace}{backspace}10');

      const EventListDOM = container.querySelector('#event-list');
      await waitFor(() => {
        const items = within(EventListDOM).getAllByRole('listitem');
        expect(items.length).toBe(10);
      });
    });
  });
});
