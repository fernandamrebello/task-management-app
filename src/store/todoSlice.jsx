import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (storedTodos) => {
  if (storedTodos) {
    return storedTodos;
  } else {
    const response = await axios.get('https://dummyjson.com/todos?limit=5');
    return response.data.todos.map(todo => ({
      id: todo.id.toString(),
      title: todo.todo,
      description: '',
      status: todo.completed ? 'completed' : 'pending',
    }));
  }
});

// Creating the todoSlice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.items.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Exporting action creators and reducer
export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
