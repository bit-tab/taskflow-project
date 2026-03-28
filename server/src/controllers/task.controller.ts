import { Request, Response } from 'express';
import { taskService } from '../services/task.service';

export const taskController = {
  // Obtener todas las tareas
  getAll: (req: Request, res: Response) => {
    const tasks = taskService.getAll();
    res.json(tasks);
  },

  // Obtener una sola tarea por ID
  getOne: (req: Request, res: Response) => {
    const { id } = req.params;
    const task = taskService.getById(id as string);
    
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
  },

  // Crear una nueva tarea
  create: (req: Request, res: Response) => {
    const newTask = taskService.create(req.body);
    res.status(201).json(newTask);
  },

  // Actualizar una tarea (PUT)
  update: (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = taskService.update(id as string, req.body);
    
    if (!updated) {
      return res.status(404).json({ message: 'No se pudo actualizar: Tarea no encontrada' });
    }
    res.json(updated);
  },

  // Alternar estado completado (PATCH)
  toggle: (req: Request, res: Response) => {
    const { id } = req.params;
    const task = taskService.getById(id as string);
    
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    
    const updated = taskService.update(id as string, { completed: !task.completed });
    res.json(updated);
  },

  // Eliminar una tarea
  delete: (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = taskService.delete(id as string);
    
    if (!deleted) {
      return res.status(404).json({ message: 'No se pudo eliminar: Tarea no encontrada' });
    }
    // 204 No Content es el estándar para deletes exitosos
    res.status(204).send();
  }
};