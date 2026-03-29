import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Tipado de la tarea
interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
}

// Nuestra "Base de datos" temporal
let tasks: Task[] = [];

// GET: fetchTasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST: createTask
router.post('/', (req, res) => {
  const { title, priority } = req.body;
  const newTask: Task = {
    id: uuidv4(),
    title: title || 'Nueva tarea',
    priority: priority || 'medium',
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH: toggleTask
router.patch('/:id/toggle', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

  task.completed = !task.completed;
  res.json(task);
});

// DELETE: deleteTask
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

// PUT: updateTask
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, priority } = req.body;
  const index = tasks.findIndex(t => t.id === id);
  
  if (index === -1) return res.status(404).json({ message: 'No encontrada' });

  tasks[index] = { ...tasks[index], title, priority };
  res.json(tasks[index]);
});

export default router;