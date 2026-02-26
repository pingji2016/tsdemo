import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types/Todo';
import { todoApi } from '../api/todoApi';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        (async () => {
            try {
                const data = await todoApi.getAllTodos(controller.signal);
                if (controller.signal.aborted) return;
                setTodos(data);
                setError(null);
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError('Failed to fetch todos');
                    console.error(err);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        })();
        return () => {
            controller.abort();
        };
    }, []);

    const handleCreateTodo = useCallback(async (title: string, description?: string) => {
        try {
            const newTodo = await todoApi.createTodo({
                title,
                description,
                completed: false,
            });
            setTodos(prev => [...prev, newTodo]);
        } catch (err) {
            setError('Failed to create todo');
            console.error(err);
        }
    }, []);

    const handleToggleTodo = useCallback(async (id: string, completed: boolean) => {
        try {
            const updatedTodo = await todoApi.updateTodo(id, { completed });
            setTodos(prev =>
                prev.map(todo => (todo.id === id ? updatedTodo : todo))
            );
        } catch (err) {
            setError('Failed to update todo');
            console.error(err);
        }
    }, []);

    const handleDeleteTodo = useCallback(async (id: string) => {
        try {
            await todoApi.deleteTodo(id);
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch (err) {
            setError('Failed to delete todo');
            console.error(err);
        }
    }, []);

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
