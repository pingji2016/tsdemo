import React, { useState } from 'react';

interface TodoFormProps {
    onSubmit: (title: string, description?: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showDescription, setShowDescription] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit(title.trim(), description.trim() || undefined);
            setTitle('');
            setDescription('');
            setShowDescription(false);
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Enter todo title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button type="submit">Add Todo</button>
            </div>

            {!showDescription ? (
                <button
                    type="button"
                    className="add-description-btn"
                    onClick={() => setShowDescription(true)}
                >
                    + Add Description
                </button>
            ) : (
                <textarea
                    placeholder="Enter description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
            )}
        </form>
    );
};

export default TodoForm;