let data = JSON.parse(localStorage.getItem('taskflow_vFinal')) || [];

// --- MODO OSCURO TOTAL ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const applyTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
    themeIcon.innerText = isDark ? '☀️' : '🌙';
};

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.innerText = isDark ? '☀️' : '🌙';
});

applyTheme(localStorage.getItem('theme') === 'dark');

// --- LÓGICA DE DATOS ---
const newListForm = document.getElementById('newListForm');
const workspace = document.getElementById('workspace');

newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newListInput');
    const colors = ['from-pink-500 to-rose-500', 'from-indigo-500 to-blue-500', 'from-emerald-500 to-teal-500', 'from-amber-500 to-orange-500', 'from-purple-500 to-fuchsia-500'];
    
    data.push({
        id: Date.now().toString(),
        name: input.value.trim(),
        color: colors[Math.floor(Math.random() * colors.length)],
        categories: [],
        tasks: []
    });
    input.value = '';
    render();
});

window.addCategory = (listId) => {
    const name = prompt("Nombre de la categoría:");
    if (!name) return;
    data.find(l => l.id === listId).categories.push({ id: Date.now().toString(), name, tasks: [] });
    render();
};

window.addTask = (listId, catId = null) => {
    const text = prompt("¿Qué hay que hacer?");
    if (!text) return;
    const list = data.find(l => l.id === listId);
    const newTask = { id: Date.now().toString(), text, status: 'pendiente' };
    catId ? list.categories.find(c => c.id === catId).tasks.push(newTask) : list.tasks.push(newTask);
    render();
};

window.cycleStatus = (listId, catId, taskId) => {
    const list = data.find(l => l.id === listId);
    let task = catId 
        ? list.categories.find(c => c.id === catId).tasks.find(t => t.id === taskId)
        : list.tasks.find(t => t.id === taskId);
    
    const states = ['pendiente', 'proceso', 'completado'];
    task.status = states[(states.indexOf(task.status) + 1) % states.length];
    render();
};

window.deleteList = (id) => {
    if (confirm("¿Eliminar espacio?")) {
        data = data.filter(l => l.id !== id);
        render();
    }
};

// --- RENDERIZADO EXPLOSIVO ---
const render = () => {
    localStorage.setItem('taskflow_vFinal', JSON.stringify(data));
    workspace.innerHTML = '';

    data.forEach(list => {
        const div = document.createElement('div');
        div.className = "group relative bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-2xl transition-all hover:-translate-y-2 border border-white dark:border-slate-800 overflow-hidden";
        
        div.innerHTML = `
            <div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${list.color}"></div>
            
            <div class="flex justify-between items-start mb-6">
                <h3 class="text-3xl font-black italic tracking-tighter text-slate-800 dark:text-white">${list.name}</h3>
                <button onclick="deleteList('${list.id}')" class="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-red-500 transition-colors text-xs font-bold">BORRAR</button>
            </div>

            <div class="flex gap-2 mb-6">
                <button onclick="addTask('${list.id}')" class="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-inner">+ Tarea</button>
                <button onclick="addCategory('${list.id}')" class="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-inner">+ Categoria</button>
            </div>

            <div class="space-y-3 mb-6">
                ${list.tasks.map(t => renderTask(list.id, null, t)).join('')}
            </div>

            <div class="space-y-6">
                ${list.categories.map(cat => `
                    <div class="bg-indigo-50/30 dark:bg-slate-800/30 p-5 rounded-[2rem] border border-indigo-100/50 dark:border-slate-700/50">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-xs font-black uppercase tracking-widest text-indigo-500">${cat.name}</span>
                            <button onclick="addTask('${list.id}', '${cat.id}')" class="w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center font-bold text-indigo-500">+</button>
                        </div>
                        <div class="space-y-2">
                            ${cat.tasks.map(t => renderTask(list.id, cat.id, t)).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        workspace.appendChild(div);
    });
};

const renderTask = (lId, cId, t) => {
    const st = {
        pendiente: 'bg-white dark:bg-slate-800 border-amber-300 shadow-amber-100 dark:shadow-none',
        proceso: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-400 shadow-indigo-100 dark:shadow-none',
        completado: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500 opacity-40 grayscale'
    };
    const icons = { pendiente: '⏳', proceso: '🔄', completado: '✅' };

    return `
        <div onclick="cycleStatus('${lId}', ${cId ? `'${cId}'` : 'null'}, '${t.id}')" 
            class="p-4 rounded-2xl border-2 cursor-pointer flex justify-between items-center transition-all active:scale-90 hover:shadow-lg ${st[t.status]}">
            <span class="text-sm font-bold ${t.status === 'completado' ? 'line-through' : ''}">${t.text}</span>
            <span class="text-lg">${icons[t.status]}</span>
        </div>
    `;
};

render();