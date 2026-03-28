"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.toggleTask = exports.createTask = void 0;
exports.sortBy = sortBy;
exports.isTask = isTask;
const createTask = (input) => {
    return {
        ...input,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date()
    };
};
exports.createTask = createTask;
const toggleTask = (task) => {
    const isNowCompleted = !task.completed;
    return {
        ...task,
        completed: isNowCompleted,
        completedAt: isNowCompleted ? new Date() : undefined
    };
};
exports.toggleTask = toggleTask;
// Paso 4: Genérico sortBy
function sortBy(items, key) {
    return [...items].sort((a, b) => (a[key] > b[key] ? 1 : -1));
}
// Paso 4: Type Guard
function isTask(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'title' in value);
}
// Paso 5: Record para estadísticas
const getStats = (tasks) => {
    return {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length
    };
};
exports.getStats = getStats;
