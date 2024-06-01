import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from './App';
import store from './store/store'; 

test('renders Add New Task button', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByText(/Add New Task/i);
  expect(buttonElement).toBeInTheDocument();
});
