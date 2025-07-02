import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import App from './App';

// Setup mock for fetch API before each test
beforeEach(() => {
  fetchMock.resetMocks();
  // Mock the API response with the graph.json data
  fetchMock.mockResponseOnce(JSON.stringify(require('../graph.json')));
});

// Test that all form nodes are rendered as buttons
test('renders a button for each form node', async () => {
  render(<App />);
  // Wait for form buttons to appear (Form A, Form B, etc.)
  const formButtons = await screen.findAllByRole('button', { name: /Form /i });
  // Verify that all 6 form nodes from graph.json are rendered
  expect(formButtons.length).toBe(6);
});

// Test that clicking a form button opens the Prefill component
test('opens Prefill when form button is clicked', async () => {
  render(<App />);
  const formButtons = await screen.findAllByRole('button', { name: /Form /i });
  // Click the first form button (Form A)
  fireEvent.click(formButtons[0]);
  // Verify that the Prefill heading appears
  expect(await screen.findByText("Prefill")).toBeInTheDocument();
});

// Test the complete field mapping workflow
test('maps a field and displays it in Prefill', async () => {
  render(<App />);

  // Wait for the form buttons to appear and open the first form (Form A)
  const formButtons = await screen.findAllByRole('button', { name: /Form /i });
  fireEvent.click(formButtons[0]);
  
  // Wait for field buttons to appear (name, email, notes, etc.) and click on the first one
  const fieldButtons = await screen.findAllByRole('button', { name: /name|email|notes/i });
  fireEvent.click(fieldButtons[0]);
  
  // In the modal, first select a data source from the left panel
  const valueButton = await screen.findByRole('button', { name: /value/i });
  fireEvent.click(valueButton);
  
  // Now the input field should be visible on the right side
  const input = await screen.findByRole('textbox');
  // Enter a test value
  fireEvent.change(input, { target: { value: 'Test Value' } });
  
  // Click Select to confirm the mapping
  fireEvent.click(screen.getByRole('button', { name: 'Select' }));
  
  // Reopen the form and field to verify the mapping was saved
  fireEvent.click(formButtons[0]);
  fireEvent.click(fieldButtons[0]);
  fireEvent.click(valueButton);
  
  // Check that the mapped value appears in the input field
  expect(await screen.getByDisplayValue("Test Value")).toBeInTheDocument();
});

// Test clearing a mapped field
test('clears a mapped field in Prefill', async () => {
  render(<App />);
  
   // Wait for the form buttons to appear and open the first form (Form A)
   const formButtons = await screen.findAllByRole('button', { name: /Form /i });
   fireEvent.click(formButtons[0]);
  
  const fieldButtons = await screen.findAllByRole('button', { name: /name|email|notes/i });

  // Open the mapping modal for a field
  fireEvent.click(fieldButtons[0]);

  // Select a data source and enter a value
  const valueButton = await screen.findByRole('button', { name: /value/i });
  fireEvent.click(valueButton);
  const input = await screen.findByRole('textbox');
  fireEvent.change(input, { target: { value: 'To Be Cleared' } });
  fireEvent.click(screen.getByRole('button', { name: 'Select' }));
  
  // Find and click the clear button (X) for the mapped field
  const clearButton = await screen.findByRole('button', { name: /X/i });
  fireEvent.click(clearButton);
  
  // Verify that the cleared value is no longer in the document
  await waitFor(() => {
    expect(screen.queryByText(/To Be Cleared/)).not.toBeInTheDocument();
  });
});
