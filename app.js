let data = JSON.parse(localStorage.getItem('taskflow_v4')) || [];

const save = () => localStorage.setItem('taskflow_v4', JSON.stringify(data));

// --- CREACIÓN ---
window.createList = () => {
    const input = document.getElementById('newListInput');
    if (!input.value.trim()) return;
    data.push({
        id: Date.now().toString(),
        name: input.value.trim(),
        categories: [],
        mainTasks: [] // Tareas sin categoría
    });
    input.value = '';
    render();
};

window.addCategory = (listId) => {
    const name = prompt("Nombre de la categoría (Hogar, Trabajo, etc):");
    if (!name) return;
    const list = data.find(l => l.id === listId);
    list.categories.push({ id: Date.now().toString(), name, tasks: [] });
    render();
};

window.addTask = (listId, catId = null) => {
    const text = prompt("¿Qué hay que hacer?");
    if (!text) return;
    const list = data.find(l => l.id === listId);
    
    const newTask = { id: Date.now().toString(), text, status: 'pendiente' };
    
    if (catId) {
        const cat = list.categories.find(c => c.id === catId);
        cat.tasks.push(newTask);
    } else {
        list.mainTasks.push(newTask);
    }
    render();
};

// --- CICLO DE ESTADOS ---
window.nextStatus = (listId, catId, taskId) => {
    const list = data.find(l => l.id === listId);
    let task;
    
    if (catId) {
        const cat = list.categories.find(c => c.id === catId);
        task = cat.tasks.find(t => t.id === taskId);
    } else {
        task = list.mainTasks.find(t => t.id === taskId);
    }
    
    const states = ['pendiente', 'proceso', 'completado'];
    task.status = states[(states.indexOf(task.status) + 1) % states.length];
    render();
};

// --- RENDERIZADO VISUAL ---
const render = () => {
    const workspace = document.getElementById('workspace');
    if (data.length === 0) {
        workspace.innerHTML = `
            <div class="text-center p-20 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
                <span class="text-6xl">✨</span>
                <p class="mt-4 text-slate-400 font-medium">No tienes listas aún. Crea una a la izquierda para empezar.</p>
            </div>`;
        return;
    }

    workspace.innerHTML = data.map(list => `
        <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="flex justify-between items-end border-b-2 border-slate-100 dark:border-slate-800 pb-4">
                <h2 class="text-4xl font-black italic text-slate-800 dark:text-white">${list.name}</h2>
                <div class="flex gap-2">
                    <button onclick="addTask('${list.id}')" class="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-xl font-bold text-sm">+ Tarea Libre</button>
                    <button onclick="addCategory('${list.id}')" class="px-4 py-2 bg-indigo-500 text-white rounded-xl font-bold text-sm">+ Categoría</button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                
                ${list.mainTasks.length > 0 ? `
                    <div class="col-span-full bg-white/50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-white dark:border-slate-700">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">Tareas Generales</h3>
                        <div class="flex flex-wrap gap-4">
                            ${list.mainTasks.map(t => renderTaskCard(list.id, null, t)).join('')}
                        </div>
                    </div>
                ` : ''}

                ${list.categories.map(cat => `
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-lg border border-slate-100 dark:border-slate-700">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="font-extrabold text-xl text-purple-500">${cat.name}</h3>
                            <button onclick="addTask('${list.id}', '${cat.id}')" class="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold">+</button>
                        </div>
                        <div class="space-y-3">
                            ${cat.tasks.map(t => renderTaskCard(list.id, cat.id, t)).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    save();
};

const renderTaskCard = (listId, catId, t) => {
    const themes = {
        pendiente: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700',
        proceso: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300',
        completado: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-500 opacity-60'
    };
    const icons = { pendiente: '⭕', proceso: '🕒', completado: '✅' };

    return `
        <div onclick="nextStatus('${listId}', ${catId ? `'${catId}'` : 'null'}, '${t.id}')" 
            class="group p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md active:scale-95 flex items-center justify-between gap-3 ${themes[t.status]}">
            <span class="font-bold ${t.status === 'completado' ? 'line-through' : ''}">${t.text}</span>
            <span class="text-lg">${icons[t.status]}</span>
        </div>
    `;
};

render();