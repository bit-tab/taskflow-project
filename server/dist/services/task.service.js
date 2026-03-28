"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
// Nuestra "base de datos" temporal en memoria
let tasks = [];
exports.taskService = {
    // Función para obtener todas las tareas
    getAll: () => {
        return tasks;
    },
    // Función para obtener una por ID
    getById: (id) => {
        return tasks.find(t => t.id === id);
    },
    // Función para crear (La que ajustamos antes)
    create: (data) => {
        const newTask = {
            id: Date.now().toString(),
            title: data.title,
            priority: data.priority,
            description: data.description,
            completed: false,
            createdAt: new Date()
        };
        tasks.push(newTask);
        return newTask;
    },
    // Añadimos estas de una vez para el Punto 5
    update: (id, data) => {
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1)
            return null;
        tasks[index] = { ...tasks[index], ...data };
        return tasks[index];
    },
    delete: (id) => {
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1)
            return false;
        tasks.splice(index, 1);
        return true;
    }
};
