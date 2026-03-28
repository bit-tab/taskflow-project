import { Request, Response } from 'express';
import { taskService } from '../services/task.service';

export const taskController = {
  getAll: (req: Request, res: Response) => {
    const tasks = taskService.getAll();
    res.json(tasks);
  },

  create: (req: Request, res: Response) => {
    // Aquí req.body cuenta como UN solo argumento que contiene todo
    const newTask = taskService.create(req.body); 
    res.status(201).json(newTask);
  },
  // (Añadiremos el resto en el Punto 5)
};