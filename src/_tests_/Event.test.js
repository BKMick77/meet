import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Event from '../components/Event';

// Load your mock data (works for default export [] or named { mockData: [] })
import * as mock from '../mock-data';
const events = Array.isArray(mock.default) ? mock.default : mock.mockData || [];
if (!Array.isArray(events) || events.length === 0) {
  throw new Error('mock-data.js did not export a non-empty events array');
}
const event = events[0];

describe('<Event /> collapsed/expanded', () => {
  test('renders collapsed info (summary, created, location) and a "Show details" button', () => {
    const { container } = render(<Event event={event} />);

    // Collapsed essentials from the brief
    expect(screen.getByText(event.summary)).toBeInTheDocument();
    expect(screen.getByText(event.created)).toBeInTheDocument();
    if (event.location) {
      expect(screen.getByText(event.location)).toBeInTheDocument();
    }

    // Button is present and details section is not
    expect(
      screen.getByRole('button', { name: /show details/i })
    ).toBeInTheDocument();
    expect(container.querySelector('.event__details')).not.toBeInTheDocument();
  });

  test('clicking "Show details" reveals details; clicking "Hide details" hides them again', () => {
    const { container } = render(<Event event={event} />);

    // Open
    fireEvent.click(screen.getByRole('button', { name: /show details/i }));

    // Details container exists now
    const details = container.querySelector('.event__details');
    expect(details).toBeInTheDocument();

    // Description assertion: use a short substring to avoid newline/whitespace issues
    // Your mock description contains "Learn JavaScript", so match on that.
    if (event.description) {
      expect(details).toHaveTextContent(/learn javascript/i);
    } else {
      // Fallback text if your component shows a default message
      expect(details).toHaveTextContent(/no additional details\./i);
    }

    // Button toggles
    expect(
      screen.getByRole('button', { name: /hide details/i })
    ).toBeInTheDocument();

    // Close
    fireEvent.click(screen.getByRole('button', { name: /hide details/i }));
    expect(container.querySelector('.event__details')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /show details/i })
    ).toBeInTheDocument();
  });
});
