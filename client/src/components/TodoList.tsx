import React, { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { todoApi } from '../api/todoApi';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const data = await todoApi.getAllTodos();
            setTodos(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch todos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTodo = async (title: string, description?: string) => {
        try {
            const newTodo = await todoApi.createTodo({
                title,
                description,
                completed: false,
            });
            setTodos([...todos, newTodo]);
        } catch (err) {
            setError('Failed to create todo');
            console.error(err);
        }
    };

    const handleToggleTodo = async (id: string, completed: boolean) => {
        try {
            const updatedTodo = await todoApi.updateTodo(id, { completed });
            setTodos(todos.map(todo =>
                todo.id === id ? updatedTodo : todo
            ));
        } catch (err) {
            setError('Failed to update todo');
            console.error(err);
        }
    };

    const handleDeleteTodo = async (id: string) => {
        try {
            await todoApi.deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            setError('Failed to delete todo');
            console.error(err);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="todo-list">
            <h1>Todo List</h1>

            {error && <div className="error">{error}</div>}

            <TodoForm onSubmit={handleCreateTodo} />

            <div className="todos">
                {todos.length === 0 ? (
                    <p className="empty">No todos yet. Create one!</p>
                ) : (
                    todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggleTodo}
                            onDelete={handleDeleteTodo}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;