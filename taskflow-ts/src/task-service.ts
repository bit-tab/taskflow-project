import { Task, CreateTaskInput, Priority } from './models';

export const createTask = (input: CreateTaskInput): Task => {
    return {
        ...input,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date()
    };
};

export const toggleTask = (task: Task): Task => {
    const isNowCompleted = !task.completed;
    return {
        ...task,
        completed: isNowCompleted,
        completedAt: isNowCompleted ? new Date() : undefined
    };
};

// Paso 4: Genérico sortBy
export function sortBy<T>(items: T[], key: keyof T): T[] {
    return [...items].sort((a, b) => (a[key] > b[key] ? 1 : -1));
}

// Paso 4: Type Guard
export function isTask(value: unknown): value is Task {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'title' in value
    );
}

// Paso 5: Record para estadísticas
export const getStats = (tasks: Task[]): Record<string, number> => {
    return {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length
    };
};