// src/__tests__/App.test.js
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('App renders the NumberOfEvents component', () => {
    const { container } = render(<App />);
    const noe = container.firstChild.querySelector('#number-of-events');
    expect(noe).toBeInTheDocument();
  });
});
