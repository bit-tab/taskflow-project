// Definición de tipos básicos
export type TaskId = string;

// Interfaz principal del dominio
export interface Task {
    id: TaskId;
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
}

// Alias de tipo para reuso
export type Priority = Task['priority'];

// Modelos adicionales
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

// --- TIPOS DE UTILIDAD (Paso 2 y 5) ---

/**
 * CreateTaskInput: Usado para crear tareas.
 * Omitimos 'id', 'createdAt' y 'completedAt' porque los genera el sistema.
 * Omitimos 'completed' porque toda tarea nueva empieza en 'false' por defecto.
 */
export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'completedAt' | 'completed'>;

/**
 * TaskSummary: Una versión ligera de la tarea para listados rápidos.
 */
export type TaskSummary = Pick<Task, 'id' | 'title' | 'priority'>;

/**
 * TaskUpdate: Permite actualizar cualquier campo de la tarea de forma opcional.
 */
export type TaskUpdate = Partial<Task>;

/**
 * ApiResponse: Genérico para estandarizar respuestas (Paso 4)
 */
export type ApiResponse<T> = {
    data: T;
    error?: string;
    timestamp: Date;
};