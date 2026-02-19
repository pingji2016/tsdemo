import React from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => onToggle(todo.id, e.target.checked)}
            />
            <div className="todo-content">
                <h3>{todo.title}</h3>
                {todo.description && <p>{todo.description}</p>}
                <small>Created: {new Date(todo.createdAt).toLocaleDateString()}</small>
            </div>
            <button
                className="delete-btn"
                onClick={() => onDelete(todo.id)}
            >
                Delete
            </button>
        </div>
    );
};

export default TodoItem;