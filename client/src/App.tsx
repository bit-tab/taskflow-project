import { useEffect, useState } from 'react';
import { taskApi } from './lib/api';
import { Trash2, CheckCircle, Circle, Plus, Loader2 } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);

  // --- 1. CARGAR (Sustituye a localStorage.getItem) ---
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await taskApi.fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error cargando tareas:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // --- 2. CREAR (Sustituye a localStorage.setItem) ---
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    try {
      const newTask = await taskApi.createTask(newTitle, 'medium');
      setTasks([...tasks, newTask]);
      setNewTitle('');
    } catch (error) {
      alert("No se pudo crear la tarea");
    }
  };

  // --- 3. TOGGLE (Actualiza en el servidor) ---
  const handleToggle = async (id: string) => {
    try {
      const updated = await taskApi.toggleTask(id);
      setTasks(tasks.map(t => t.id === id ? updated : t));
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  // --- 4. ELIMINAR (Borra en el servidor) ---
  const handleDelete = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex justify-center bg-slate-900 text-white font-sans">
      <div className="max-w-md w-full">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">
            TaskFlow Pro
          </h1>
          <p className="text-slate-400 mt-2 font-medium">API Connected Version</p>
        </header>

        <form onSubmit={handleAddTask} className="flex gap-2 mb-8">
          <input 
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="¿Cuál es el siguiente reto?"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 p-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
            <Plus size={24} />
          </button>
        </form>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-slate-500 mt-10">No hay tareas pendientes. ¡Relax! ☕</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="group flex items-center justify-between bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all">
                <div className="flex items-center gap-4">
                  <button onClick={() => handleToggle(task.id)} className="transition-transform active:scale-125">
                    {task.completed ? 
                      <CheckCircle className="text-emerald-400 fill-emerald-400/10" size={24} /> : 
                      <Circle className="text-slate-500 hover:text-blue-400" size={24} />
                    }
                  </button>
                  <span className={`text-lg transition-all ${task.completed ? 'line-through text-slate-500 italic' : 'text-slate-200'}`}>
                    {task.title}
                  </span>
                </div>
                <button 
                  onClick={() => handleDelete(task.id)} 
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;