// --- ESTADO Y PERSISTENCIA ---
let data = JSON.parse(localStorage.getItem('taskflow_v5')) || [];

const save = () => localStorage.setItem('taskflow_v5', JSON.stringify(data));

// --- CORRECCIÓN MODO OSCURO ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.innerText = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.innerText = '🌙';
    }
};

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeIcon.innerText = isDark ? '☀️' : '🌙';
});

// Aplicar tema al cargar
applyTheme(localStorage.getItem('theme') || 'light');

// --- LÓGICA DE NEGOCIO ---

window.createList = () => {
    const input = document.getElementById('newListInput');
    if (!input.value.trim()) return;
    data.push({
        id: Date.now().toString(),
        name: input.value.trim(),
        categories: [],
        standaloneTasks: []
    });
    input.value = '';
    render();
};

window.addCategory = (listId) => {
    const name = prompt("Nombre de la categoría:");
    if (!name) return;
    data.find(l => l.id === listId).categories.push({
        id: Date.now().toString(),
        name,
        tasks: []
    });
    render();
};

window.addTask = (listId, catId = null) => {
    const text = prompt("¿Qué hay que hacer?");
    if (!text) return;
    const list = data.find(l => l.id === listId);
    const newTask = { id: Date.now().toString(), text, status: 'pendiente' };
    
    if (catId) {
        list.categories.find(c => c.id === catId).tasks.push(newTask);
    } else {
        list.standaloneTasks.push(newTask);
    }
    render();
};

window.cycleStatus = (listId, catId, taskId) => {
    const list = data.find(l => l.id === listId);
    let task;
    if (catId) {
        task = list.categories.find(c => c.id === catId).tasks.find(t => t.id === taskId);
    } else {
        task = list.standaloneTasks.find(t => t.id === taskId);
    }
    
    const states = ['pendiente', 'proceso', 'completado'];
    task.status = states[(states.indexOf(task.status) + 1) % states.length];
    render();
};

window.deleteList = (id) => {
    if(confirm("¿Borrar lista completa?")) {
        data = data.filter(l => l.id !== id);
        render();
    }
};

// --- RENDERIZADO ---
const render = () => {
    const workspace = document.getElementById('workspace');
    workspace.innerHTML = '';

    data.forEach(list => {
        const listCard = document.createElement('div');
        listCard.className = "glass-card rounded-[2.5rem] p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-300";
        
        listCard.innerHTML = `
            <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
                <h2 class="text-xl font-black text-indigo-600 dark:text-indigo-400 truncate">${list.name}</h2>
                <button onclick="deleteList('${list.id}')" class="text-xs opacity-30 hover:opacity-100 hover:text-red-500">Eliminar</button>
            </div>

            <div class="flex gap-2 mb-2">
                <button onclick="addTask('${list.id}')" class="flex-1 py-2 text-xs font-bold bg-indigo-500 text-white rounded-xl">+ Tarea</button>
                <button onclick="addCategory('${list.id}')" class="flex-1 py-2 text-xs font-bold bg-slate-200 dark:bg-slate-700 rounded-xl">+ Cat</button>
            </div>

            <div class="space-y-2">
                ${list.standaloneTasks.map(t => renderTask(list.id, null, t)).join('')}
            </div>

            <div class="space-y-4">
                ${list.categories.map(cat => `
                    <div class="bg-indigo-50/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-indigo-100 dark:border-slate-800">
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-[10px] font-black uppercase tracking-tighter text-indigo-400">${cat.name}</span>
                            <button onclick="addTask('${list.id}', '${cat.id}')" class="text-indigo-500 font-bold">+</button>
                        </div>
                        <div class="space-y-2">
                            ${cat.tasks.map(t => renderTask(list.id, cat.id, t)).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        workspace.appendChild(listCard);
    });
    save();
};

const renderTask = (lId, cId, t) => {
    const styles = {
        pendiente: 'bg-white dark:bg-slate-800 border-amber-300 text-amber-700 dark:text-amber-400',
        proceso: 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 text-blue-700 dark:text-blue-300',
        completado: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 opacity-60'
    };
    const icons = { pendiente: '⏳', proceso: '🔄', completado: '✅' };
    
    return `
        <div onclick="cycleStatus('${lId}', ${cId ? `'${cId}'` : 'null'}, '${t.id}')" 
            class="task-cloud p-3 rounded-xl border-l-4 shadow-sm cursor-pointer flex justify-between items-center text-sm font-semibold ${styles[t.status]}">
            <span class="${t.status === 'completado' ? 'line-through' : ''}">${t.text}</span>
            <span>${icons[t.status]}</span>
        </div>
    `;
};

render();