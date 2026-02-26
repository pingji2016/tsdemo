export interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
}

export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt'>;
export type UpdateTodoInput = Partial<CreateTodoInput>;
