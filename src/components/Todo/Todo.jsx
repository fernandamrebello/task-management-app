import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { addTodo, deleteTodo, updateTodo, fetchTodos } from '../../store/todoSlice'; 
import styles from './Todo.module.scss';

const Todo = () => { // Functional component Todo
    // State variables using useState hook
    const [inputTitle, setinputTitle] = useState('');
    const [inputDesc, setinputDesc] = useState('');
    const [inputStatus, setinputStatus] = useState('pending');
    const [isEditItem, setisEditItem] = useState(null);
    const [showForm, setshowform] = useState(false);

    // useDispatch hook to dispatch actions
    const dispatch = useDispatch();
    // useSelector hook to access state
    const { items, status } = useSelector((state) => state.todos);

    // useEffect hook to fetch from local storage on component mount
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            dispatch(fetchTodos(storedTodos));
        } else {
            dispatch(fetchTodos());
        }
    }, [dispatch]);

    // useEffect to update local storage when state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(items));
    }, [items]);

    // Event handlers for input fields
    const handleInput = (e) => setinputTitle(e.target.value);
    const handleInputDesc = (e) => setinputDesc(e.target.value);
    const handleInputStatus = (e) => setinputStatus(e.target.value);

    // Event handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputTitle || !inputDesc || !inputStatus) {
            alert('Please fill in all the fields');
            return;
        }

        if (isEditItem) {
            dispatch(updateTodo({
                id: isEditItem,
                title: inputTitle,
                description: inputDesc,
                status: inputStatus,
            }));
        } else {
            dispatch(addTodo({
                id: new Date().getTime().toString(),
                title: inputTitle,
                description: inputDesc,
                status: inputStatus,
            }));
        }

        setinputTitle('');
        setinputDesc('');
        setinputStatus('pending');
        setisEditItem(null);
        setshowform(false);
    };

    // Event handler to delete an item
    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    // Event handler to edit an item
    const handleEdit = (todo) => {
        setinputTitle(todo.title);
        setinputDesc(todo.description);
        setinputStatus(todo.status);
        setisEditItem(todo.id);
        setshowform(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Task List</h1>
                <button className={styles.customButton} onClick={() => setshowform(!showForm)}>
                    {showForm ? 'Close' : 'Add New Task'}
                </button>
            </div>

            {showForm && (
                <div className={styles.formContainer}>
                    <h2 className={styles.textCenter}>{isEditItem ? 'Edit Task' : 'Add New Task'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formRow}>
                            <label htmlFor="title" className={styles.label}>Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title"
                                className={styles.input}
                                onChange={handleInput}
                                value={inputTitle}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <label htmlFor="description" className={styles.label}>Description</label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Description"
                                className={styles.input}
                                onChange={handleInputDesc}
                                value={inputDesc}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <label htmlFor="status" className={styles.label}>Status</label>
                            <select
                                name="status"
                                id="status"
                                className={styles.select}
                                onChange={handleInputStatus}
                                value={inputStatus}
                            >
                                <option value="pending">Pending</option>
                                <option value="in progress">In progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <button className={styles.submitButton} type="submit">
                            {isEditItem ? 'Update' : 'Save'}
                        </button>
                    </form>
                </div>
            )}

            <div className={styles.taskList}>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error loading tasks</p>}
                {status === 'succeeded' && items.map((todo) => (
                    <div className={styles.taskItem} key={todo.id}>
                        <div className={styles.taskMeta}>
                            <h4>{todo.title}</h4>
                            <p>{todo.description}</p>
                            <p>Status: {todo.status}</p>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.buttonPrimary} onClick={() => handleEdit(todo)}>
                                Edit
                            </button>
                            <button className={styles.buttonDanger} onClick={() => handleDelete(todo.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todo; 
