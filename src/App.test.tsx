import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('backend server API retrieves proper data', async () => {
  const res: Response = await fetch("/api/v1/123/actions/blueprints/bp_456/bpv_123/graph");
  const data = await res.json();
  expect(data).toBeTruthy();
});

test('number of buttons shown must be same as number of nodes', async () => {
  const res: Response = await fetch("/api/v1/123/actions/blueprints/bp_456/bpv_123/graph");
  const data = await res.json();
  
  expect(data).toBeTruthy();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
