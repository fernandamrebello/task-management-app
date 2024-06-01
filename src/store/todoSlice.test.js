import reducer, { addTodo, deleteTodo, updateTodo, fetchTodos } from './todoSlice';

// Describe block for testing todoSlice
describe('todoSlice', () => {
  // Initial state for testing
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };

  // Test case for handling initial state
  test('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Test case for handling addTodo action
  test('should handle addTodo', () => {
    const actual = reducer(initialState, addTodo({
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      status: 'pending',
    }));
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].title).toEqual('Test Todo');
  });

  // Test case for handling deleteTodo action
  test('should handle deleteTodo', () => {
    // Starting state for testing
    const startState = {
      items: [{ id: '1', title: 'Test Todo', description: 'Test Description', status: 'pending' }],
      status: 'idle',
      error: null,
    };
    const actual = reducer(startState, deleteTodo('1')); // Dispatching deleteTodo action
    expect(actual.items.length).toEqual(0); // Expecting items array to be empty after deletion
  });

  // Test case for handling updateTodo action
  test('should handle updateTodo', () => {
    // Starting state for testing
    const startState = {
      items: [{ id: '1', title: 'Test Todo', description: 'Test Description', status: 'pending' }],
      status: 'idle',
      error: null,
    };
    const actual = reducer(startState, updateTodo({
      id: '1',
      title: 'Updated Todo',
      description: 'Updated Description',
      status: 'completed',
    })); // Dispatching updateTodo action
    expect(actual.items[0].title).toEqual('Updated Todo'); // Expecting title to be updated
  });

  // Test case for handling fetchTodos action (async)
  test('should handle fetchTodos', async () => {
    // Starting state for testing
    const startState = {
      items: [],
      status: 'idle',
      error: null,
    };
    const mockResponse = [ // Mock response for testing
      { id: '1', title: 'API Todo', description: '', status: 'pending' },
    ];
    const actual = await reducer(startState, fetchTodos.fulfilled(mockResponse)); // Dispatching fetchTodos action
    expect(actual.items.length).toEqual(1); // Expecting one item to be fetched
    expect(actual.items[0].title).toEqual('API Todo'); // Expecting the fetched item to have title 'API Todo'
  });
});
