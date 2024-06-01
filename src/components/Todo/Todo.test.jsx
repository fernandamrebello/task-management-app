import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Todo from './Todo';

// Mock window.alert
window.alert = jest.fn();

// Configuring mock Redux store
const mockStore = configureStore([]);

// Testing Todo Component
describe('Todo Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ todos: { items: [], status: 'idle' } });
    store.dispatch = jest.fn();
  });

  // Test case: Renders the Todo component
  test('renders the Todo component', () => {
    render(
      <Provider store={store}>
        <Todo />
      </Provider>
    );
    // Expecting 'Add New Task' text to be present 
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
  });

  // Test case: Allows adding a new task
  test('allows adding a new task', () => {
    render(
      <Provider store={store}>
        <Todo />
      </Provider>
    );

    // Simulating click on 'Add New Task' button
    fireEvent.click(screen.getByText('Add New Task'));

    // Entering task title and clicking 'Save' button
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Add New Task' } });
    fireEvent.click(screen.getByText('Save'));

    // Expecting 'Add New Task' text to be present 
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
  });
});
