export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Category {
    id: string;
    name: string;
    color: string;
}