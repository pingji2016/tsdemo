import axios from 'axios';
import { Todo, CreateTodoInput } from '../types/Todo';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const todoApi = {
    // 获取所有待办事项
    getAllTodos: async (): Promise<Todo[]> => {
        const response = await api.get<Todo[]>('/todos');
        return response.data;
    },

    // 获取单个待办事项
    getTodoById: async (id: string): Promise<Todo> => {
        const response = await api.get<Todo>(`/todos/${id}`);
        return response.data;
    },

    // 创建待办事项
    createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
        const response = await api.post<Todo>('/todos', todo);
        return response.data;
    },

    // 更新待办事项
    updateTodo: async (id: string, todo: Partial<CreateTodoInput>): Promise<Todo> => {
        const response = await api.put<Todo>(`/todos/${id}`, todo);
        return response.data;
    },

    // 删除待办事项
    deleteTodo: async (id: string): Promise<void> => {
        await api.delete(`/todos/${id}`);
    },
};