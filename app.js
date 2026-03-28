// --- ESTADO GLOBAL ---
let data = JSON.parse(localStorage.getItem('taskflow_v7')) || [];
let currentFilter = 'all'; // all, pendiente, completado

// --- PERSISTENCIA Y TEMA ---
const applyTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
    document.getElementById('themeIcon').innerText = isDark ? '☀️' : '🌙';
};

document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
});

applyTheme(localStorage.getItem('theme') === 'dark');

// --- ACCIONES DE PROYECTO ---
document.getElementById('newListForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newListInput');
    const colors = ['border-pink-500', 'border-indigo-500', 'border-emerald-500', 'border-amber-500'];
    
    data.push({
        id: Date.now().toString(),
        name: input.value.trim(),
        color: colors[data.length % colors.length],
        categories: [],
        tasks: []
    });
    input.value = '';
    saveAndRender();
});

window.addCategory = (listId) => {
    const name = prompt("Nombre de la categoría:");
    if (!name) return;
    data.find(l => l.id === listId).categories.push({ id: Date.now().toString(), name, tasks: [] });
    saveAndRender();
};

window.addTask = (listId, catId = null) => {
    const text = prompt("Tarea:");
    if (!text) return;
    const list = data.find(l => l.id === listId);
    const newTask = { id: Date.now().toString(), text, status: 'pendiente' };
    catId ? list.categories.find(c => c.id === catId).tasks.push(newTask) : list.tasks.push(newTask);
    saveAndRender();
};

// --- CICLO DE ESTADOS Y EDICIÓN ---
window.cycleStatus = (listId, catId, taskId) => {
    const list = data.find(l => l.id === listId);
    let task = catId 
        ? list.categories.find(c => c.id === catId).tasks.find(t => t.id === taskId)
        : list.tasks.find(t => t.id === taskId);
    
    const states = ['pendiente', 'proceso', 'completado'];
    task.status = states[(states.indexOf(task.status) + 1) % states.length];
    saveAndRender();
};

window.editTask = (listId, catId, taskId) => {
    const list = data.find(l => l.id === listId);
    let task = catId 
        ? list.categories.find(c => c.id === catId).tasks.find(t => t.id === taskId)
        : list.tasks.find(t => t.id === taskId);
    
    const newText = prompt("Editar nombre:", task.text);
    if (newText?.trim()) {
        task.text = newText.trim();
        saveAndRender();
    }
};

window.deleteTask = (listId, catId, taskId) => {
    const list = data.find(l => l.id === listId);
    if (catId) {
        const cat = list.categories.find(c => c.id === catId);
        cat.tasks = cat.tasks.filter(t => t.id !== taskId);
    } else {
        list.tasks = list.tasks.filter(t => t.id !== taskId);
    }
    saveAndRender();
};

// --- FILTROS Y ESTADÍSTICAS ---
const updateStats = () => {
    let total = 0, pending = 0, done = 0;
    data.forEach(list => {
        const allListTasks = [...list.tasks, ...list.categories.flatMap(c => c.tasks)];
        total += allListTasks.length;
        pending += allListTasks.filter(t => t.status !== 'completado').length;
        done += allListTasks.filter(t => t.status === 'completado').length;
    });
    document.getElementById('statTotal').innerText = total;
    document.getElementById('statPending').innerText = pending;
    document.getElementById('statDone').innerText = done;
};

window.setFilter = (f) => { currentFilter = f; render(); };

document.getElementById('searchInput').addEventListener('input', render);

window.completeAll = () => {
    data.forEach(list => {
        list.tasks.forEach(t => t.status = 'completado');
        list.categories.forEach(c => c.tasks.forEach(t => t.status = 'completado'));
    });
    saveAndRender();
};

window.clearDone = () => {
    data.forEach(list => {
        list.tasks = list.tasks.filter(t => t.status !== 'completado');
        list.categories.forEach(c => c.tasks = c.tasks.filter(t => t.status !== 'completado'));
    });
    saveAndRender();
};

// --- RENDERIZADO ---
const saveAndRender = () => {
    localStorage.setItem('taskflow_v7', JSON.stringify(data));
    updateStats();
    render();
};

const render = () => {
    const workspace = document.getElementById('workspace');
    const query = document.getElementById('searchInput').value.toLowerCase();
    workspace.innerHTML = '';

    data.forEach(list => {
        const listDiv = document.createElement('div');
        listDiv.className = `glass-card p-6 border-t-8 ${list.color} animate-in fade-in`;
        
        const filteredTasks = list.tasks.filter(t => 
            t.text.toLowerCase().includes(query) && (currentFilter === 'all' || t.status === currentFilter)
        );

        const categoriesHTML = list.categories.map(cat => {
            const catTasks = cat.tasks.filter(t => 
                t.text.toLowerCase().includes(query) && (currentFilter === 'all' || t.status === currentFilter)
            );
            if (catTasks.length === 0 && query) return '';
            
            return `
                <div class="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-[10px] font-black uppercase text-indigo-400">${cat.name}</span>
                        <button onclick="addTask('${list.id}', '${cat.id}')" class="text-indigo-500 font-bold">+</button>
                    </div>
                    ${catTasks.map(t => renderTaskUI(list.id, cat.id, t)).join('')}
                </div>
            `;
        }).join('');

        listDiv.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-black italic dark:text-white">${list.name}</h3>
                <button onclick="window.deleteList('${list.id}')" class="text-[10px] text-red-500 font-bold">BORRAR</button>
            </div>
            <div class="flex gap-2 mb-4 text-[10px] font-bold">
                <button onclick="addTask('${list.id}')" class="flex-1 py-2 bg-indigo-500 text-white rounded-lg">+ Tarea</button>
                <button onclick="addCategory('${list.id}')" class="flex-1 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg">+ Cat</button>
            </div>
            <div class="space-y-2">${filteredTasks.map(t => renderTaskUI(list.id, null, t)).join('')}</div>
            ${categoriesHTML}
        `;
        workspace.appendChild(listDiv);
    });
};

const renderTaskUI = (lId, cId, t) => {
    const icons = { pendiente: '⏳', proceso: '🔄', completado: '✅' };
    const styles = {
        pendiente: 'bg-white dark:bg-slate-800 border-amber-400',
        proceso: 'bg-indigo-50 dark:bg-blue-900/30 border-blue-500',
        completado: 'opacity-40 grayscale line-through'
    };

    return `
        <div class="group p-3 rounded-xl border-l-4 shadow-sm flex items-center justify-between mb-2 transition-all ${styles[t.status]}">
            <div onclick="cycleStatus('${lId}', ${cId ? `'${cId}'` : 'null'}, '${t.id}')" class="flex-1 cursor-pointer font-bold text-sm">
                ${icons[t.status]} ${t.text}
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="editTask('${lId}', ${cId ? `'${cId}'` : 'null'}, '${t.id}')" aria-label="Editar" class="text-xs">✏️</button>
                <button onclick="deleteTask('${lId}', ${cId ? `'${cId}'` : 'null'}, '${t.id}')" aria-label="Eliminar" class="text-xs">🗑️</button>
            </div>
        </div>
    `;
};

window.deleteList = (id) => { if(confirm("¿Borrar proyecto?")) { data = data.filter(l => l.id !== id); saveAndRender(); }};

saveAndRender();