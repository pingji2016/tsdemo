import axios from 'axios';
import { Todo, CreateTodoInput } from '../types/Todo';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export const todoApi = {
    getAllTodos: async (signal?: AbortSignal): Promise<Todo[]> => {
        const response = await api.get<Todo[]>('/todos', { signal });
        return response.data;
    },

    getTodoById: async (id: string): Promise<Todo> => {
        const response = await api.get<Todo>(`/todos/${id}`);
        return response.data;
    },

    createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
        const response = await api.post<Todo>('/todos', todo);
        return response.data;
    },

    updateTodo: async (id: string, todo: Partial<CreateTodoInput>): Promise<Todo> => {
        const response = await api.put<Todo>(`/todos/${id}`, todo);
        return response.data;
    },

    deleteTodo: async (id: string): Promise<void> => {
        await api.delete(`/todos/${id}`);
    },
};
