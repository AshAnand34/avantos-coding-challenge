import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import App from './App';

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce(JSON.stringify(require('../graph.json')));
});

test('renders a button for each form node', async () => {
  render(<App />);
  // Wait for buttons to appear
  const formButtons = await screen.findAllByRole('button', { name: /Form /i });
  // There are 6 nodes in the provided graph.json
  expect(formButtons.length).toBe(6);
});

test('opens Prefill when form button is clicked', async () => {
  render(<App />);
  const formButtons = await screen.findAllByRole('button', { name: /Form /i });
  fireEvent.click(formButtons[0]);
  expect(await screen.findByText("Prefill")).toBeInTheDocument();
});

test('maps a field and displays it in Prefill', async () => {
  render(<App />);
  const formButtons = await screen.findAllByRole('button', { name: /Form /i });
  fireEvent.click(formButtons[0]);
  // Wait for a field button to appear
  const fieldButtons = await screen.findAllByRole('button', { name: /name|email|notes/i });
  fireEvent.click(fieldButtons[0]);
  // First select a field from the left panel to make the input appear
  const valueButton = await screen.findByRole('button', { name: /value/i });
  fireEvent.click(valueButton);
  // Now the input field should be visible
  const input = await screen.findByRole('textbox');
  fireEvent.change(input, { target: { value: 'Test Value' } });
  // Click Select
  fireEvent.click(screen.getByRole('button', { name: 'Select' }));
  // Check that the value appears in the Prefill list
  fireEvent.click(formButtons[0]);
  fireEvent.click(fieldButtons[0]);
  fireEvent.click(valueButton);
  expect(await screen.getByDisplayValue("Test Value")).toBeInTheDocument();
});

test('clears a mapped field in Prefill', async () => {
  render(<App />);
  const formButtons = await screen.findAllByRole('button', { name: /Form /i });
  fireEvent.click(formButtons[0]);
  const fieldButtons = await screen.findAllByRole('button', { name: /name|email|notes/i });
  fireEvent.click(fieldButtons[0]);
  // First select a field from the left panel to make the input appear
  const valueButton = await screen.findByRole('button', { name: /value/i });
  fireEvent.click(valueButton);
  // Now the input field should be visible
  const input = await screen.findByRole('textbox');
  fireEvent.change(input, { target: { value: 'To Be Cleared' } });
  fireEvent.click(screen.getByRole('button', { name: 'Select' }));
  
  const clearButton = await screen.findByRole('button', { name: /X/i });
  fireEvent.click(clearButton);
  // The value should no longer be in the document
  await waitFor(() => {
    expect(screen.queryByText(/To Be Cleared/)).not.toBeInTheDocument();
  });
});
