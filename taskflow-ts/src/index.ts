import { createTask, toggleTask, sortBy, getStats } from './task-service';
import { Task } from './models';

const t1 = createTask({ title: "Aprender TS", priority: "high" });
const t2 = createTask({ title: "Configurar Express", priority: "medium" });

const myTasks = [t1, t2];

console.log("Tareas Iniciales:", myTasks);
console.log("Ordenadas por título:", sortBy(myTasks, "title"));
console.log("Estadísticas:", getStats(myTasks));

const t1Completed = toggleTask(t1);
console.log("Tarea 1 completada:", t1Completed);