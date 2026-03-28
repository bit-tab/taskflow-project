"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const task_service_1 = require("../services/task.service");
exports.taskController = {
    getAll: (req, res) => {
        const tasks = task_service_1.taskService.getAll();
        res.json(tasks);
    },
    create: (req, res) => {
        // Aquí req.body cuenta como UN solo argumento que contiene todo
        const newTask = task_service_1.taskService.create(req.body);
        res.status(201).json(newTask);
    },
    // (Añadiremos el resto en el Punto 5)
};
