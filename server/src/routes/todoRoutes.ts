import { Router, Request, Response } from 'express';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../models/Todo';

const router = Router();

// 模拟数据库
let todos: Todo[] = [];

// 获取所有待办事项
router.get('/todos', (req: Request, res: Response) => {
    res.json(todos);
});

// 获取单个待办事项
router.get('/todos/:id', (req: Request, res: Response) => {
    const todo = todos.find(t => t.id === req.params.id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
});

// 创建待办事项
router.post('/todos', (req: Request<{}, {}, CreateTodoInput>, res: Response) => {
    const { title, description, completed = false } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        description,
        completed,
        createdAt: new Date()
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// 更新待办事项
router.put('/todos/:id', (req: Request<{ id: string }, {}, UpdateTodoInput>, res: Response) => {
    const index = todos.findIndex(t => t.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos[index] = {
        ...todos[index],
        ...req.body
    };

    res.json(todos[index]);
});

// 删除待办事项
router.delete('/todos/:id', (req: Request<{ id: string }>, res: Response) => {
    const index = todos.findIndex(t => t.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos = todos.filter(t => t.id !== req.params.id);
    res.status(204).send();
});

export default router;