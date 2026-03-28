import { Task } from '../models/task.model';

// Nuestra "base de datos" temporal en memoria
let tasks: Task[] = [];

export const taskService = {
  // Función para obtener todas las tareas
  getAll: (): Task[] => {
    return tasks;
  },

  // Función para obtener una por ID
  getById: (id: string): Task | undefined => {
    return tasks.find(t => t.id === id);
  },

  // Función para crear (La que ajustamos antes)
  create: (data: { title: string; priority: string; description?: string }): Task => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      priority: data.priority as any,
      description: data.description,
      completed: false,
      createdAt: new Date()
    };
    tasks.push(newTask);
    return newTask;
  },

  // Añadimos estas de una vez para el Punto 5
  update: (id: string, data: Partial<Task>): Task | null => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data };
    return tasks[index];
  },

  delete: (id: string): boolean => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
};