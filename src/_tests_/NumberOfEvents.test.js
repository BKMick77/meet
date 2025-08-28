import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents />', () => {
  test('contains an element with role "textbox"', () => {
    render(<NumberOfEvents />);
    expect(
      screen.getByRole('textbox', { name: /number of events/i })
    ).toBeInTheDocument();
  });

  test('default value is 32', () => {
    render(<NumberOfEvents />);
    const input = screen.getByRole('textbox', { name: /number of events/i });
    expect(input).toHaveValue('32'); // string because input type="text"
  });

  test('value updates as the user types (backspace twice, then 10)', async () => {
    const user = userEvent.setup();
    render(<NumberOfEvents />);
    const input = screen.getByRole('textbox', { name: /number of events/i });

    // Starts at "32"
    await user.type(input, '{backspace}{backspace}10'); // -> "10"
    expect(input).toHaveValue('10');
  });
});
