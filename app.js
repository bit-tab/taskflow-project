// --- ESTADO GLOBAL ---
let data = JSON.parse(localStorage.getItem('taskflow_v3')) || [];

/* Estructura de data: 
[
  { 
    id: "123", 
    name: "Mónica", 
    categories: [
      { id: "456", name: "Hogar", tasks: [{ id: "789", text: "Limpiar", status: "pendiente" }] }
    ] 
  }
]
*/

const save = () => localStorage.setItem('taskflow_v3', JSON.stringify(data));

// --- FUNCIONES DE CREACIÓN ---

window.createList = () => {
    const input = document.getElementById('newListInput');
    if (!input.value.trim()) return;
    data.push({
        id: Date.now().toString(),
        name: input.value.trim(),
        categories: []
    });
    input.value = '';
    render();
};

window.addCategory = (listId) => {
    const name = prompt("Nombre de la nueva categoría:");
    if (!name) return;
    const list = data.find(l => l.id === listId);
    list.categories.push({ id: Date.now().toString(), name, tasks: [] });
    render();
};

window.addTask = (listId, catId) => {
    const text = prompt("Nueva tarea:");
    if (!text) return;
    const list = data.find(l => l.id === listId);
    const cat = list.categories.find(c => c.id === catId);
    cat.tasks.push({ id: Date.now().toString(), text, status: 'pendiente' });
    render();
};

// --- LÓGICA DE ESTADOS (Clic para avanzar) ---
window.nextStatus = (listId, catId, taskId) => {
    const list = data.find(l => l.id === listId);
    const cat = list.categories.find(c => c.id === catId);
    const task = cat.tasks.find(t => t.id === taskId);
    
    const states = ['pendiente', 'proceso', 'completado'];
    let currentIndex = states.indexOf(task.status);
    task.status = states[(currentIndex + 1) % states.length];
    render();
};

// --- RENDERIZADO RESPONSIVO ---
const render = () => {
    const workspace = document.getElementById('workspace');
    workspace.innerHTML = '';

    data.forEach(list => {
        const listEl = document.createElement('div');
        listEl.className = "bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-2xl border border-slate-200 dark:border-slate-700";
        
        listEl.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-black text-indigo-600">${list.name}</h2>
                <button onclick="addCategory('${list.id}')" class="text-sm bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 p-3 rounded-xl font-bold hover:scale-105 transition-all">
                    + Añadir Categoría
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${list.categories.map(cat => `
                    <div class="bg-slate-50 dark:bg-slate-700/30 p-5 rounded-3xl border border-slate-200 dark:border-slate-600">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="font-bold text-lg uppercase tracking-wider text-slate-500">${cat.name}</h3>
                            <button onclick="addTask('${list.id}', '${cat.id}')" class="text-indigo-500 font-bold text-xl">+</button>
                        </div>
                        <div class="space-y-3">
                            ${cat.tasks.map(task => {
                                const statusColors = {
                                    pendiente: 'bg-white dark:bg-slate-800 border-l-4 border-amber-400',
                                    proceso: 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500',
                                    completado: 'bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 opacity-60'
                                };
                                const icon = task.status === 'pendiente' ? '⏳' : task.status === 'proceso' ? '🔄' : '✅';
                                
                                return `
                                    <div onclick="nextStatus('${list.id}', '${cat.id}', '${task.id}')" 
                                        class="p-4 rounded-xl shadow-sm cursor-pointer hover:scale-[1.02] transition-all flex items-center justify-between ${statusColors[task.status]}">
                                        <span class="font-medium ${task.status === 'completado' ? 'line-through' : ''}">${task.text}</span>
                                        <span>${icon}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        workspace.appendChild(listEl);
    });
    save();
};

// --- INICIO ---
render();