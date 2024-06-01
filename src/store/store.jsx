import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const initialState = {
  todos: {
    items: [], // Initial todos array
    status: 'idle', // Initial status
  },
};

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: initialState, 
});

export default store;
