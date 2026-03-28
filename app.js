// --- ESTADO ---
let data = JSON.parse(localStorage.getItem('taskflow_v6')) || [];

// --- MODO OSCURO (FIXED) ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const updateThemeUI = (isDark) => {
    if (isDark) {
        document.documentElement.classList.add('dark');
        themeIcon.innerText = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.innerText = '🌙';
    }
};

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeUI(isDark);
});

// Carga inicial del tema
updateThemeUI(localStorage.getItem('theme') === 'dark');

// --- GESTIÓN DE LISTAS ---
const newListForm = document.getElementById('newListForm');
const workspace = document.getElementById('workspace');

newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newListInput');
    if (!input.value.trim()) return;

    data.push({
        id: Date.now().toString(),
        name: input.value.trim(),
        categories: [],
        tasks: [] // Tareas sin categoría
    });

    input.value = '';
    saveAndRender();
});

// --- FUNCIONES DE TAREAS ---
window.addCategory = (listId) => {
    const name = prompt("Nombre de la categoría (ej: Hogar, Trabajo):");
    if (!name) return;
    data.find(l => l.id === listId).categories.push({ id: Date.now().toString(), name, tasks: [] });
    saveAndRender();
};

window.addTask = (listId, catId = null) => {
    const text = prompt("¿Qué hay que hacer?");
    if (!text) return;
    const list = data.find(l => l.id === listId);
    const newTask = { id: Date.now().toString(), text, status: 'pendiente' };
    
    if (catId) {
        list.categories.find(c => c.id === catId).tasks.push(newTask);
    } else {
        list.tasks.push(newTask);
    }
    saveAndRender();
};

window.cycleStatus = (listId, catId, taskId) => {
    const list = data.find(l => l.id === listId);
    let task;
    if (catId) {
        task = list.categories.find(c => c.id === catId).tasks.find(t => t.id === taskId);
    } else {
        task = list.tasks.find(t => t.id === taskId);
    }
    
    const states = ['pendiente', 'proceso', 'completado'];
    task.status = states[(states.indexOf(task.status) + 1) % states.length];
    saveAndRender();
};

window.deleteList = (id) => {
    if (confirm("¿Eliminar toda la lista?")) {
        data = data.filter(l => l.id !== id);
        saveAndRender();
    }
};

// --- RENDERIZADO ---
const saveAndRender = () => {
    localStorage.setItem('taskflow_v6', JSON.stringify(data));
    render();
};

const render = () => {
    workspace.innerHTML = '';

    data.forEach(list => {
        const div = document.createElement('div');
        div.className = "bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 animate-in zoom-in-95";
        
        div.innerHTML = `
            <div class="flex justify-between items-center border-b dark:border-slate-700 pb-3">
                <h3 class="text-xl font-black text-indigo-600 dark:text-indigo-400">${list.name}</h3>
                <button onclick="deleteList('${list.id}')" class="text-xs text-red-400 hover:text-red-600">Eliminar</button>
            </div>

            <div class="flex gap-2">
                <button onclick="addTask('${list.id}')" class="flex-1 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all">+ Tarea</button>
                <button onclick="addCategory('${list.id}')" class="flex-1 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">+ Categoría</button>
            </div>

            <div class="space-y-2">
                ${list.tasks.map(t => renderTaskItem(list.id, null, t)).join('')}
            </div>

            <div class="space-y-4 mt-2">
                ${list.categories.map(cat => `
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-[10px] font-black uppercase text-slate-400">${cat.name}</span>
                            <button onclick="addTask('${list.id}', '${cat.id}')" class="text-indigo-500 font-bold">+</button>
                        </div>
                        <div class="space-y-2">
                            ${cat.tasks.map(t => renderTaskItem(list.id, cat.id, t)).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        workspace.appendChild(div);
    });
};

const renderTaskItem = (lId, cId, t) => {
    const st = {
        pendiente: 'bg-white dark:bg-slate-700 border-amber-400 text-slate-700 dark:text-slate-200',
        proceso: 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-200',
        completado: 'bg-slate-100 dark:bg-slate-800 border-emerald-500 text-slate-400 dark:text-slate-500 opacity-60'
    };
    const icon = { pendiente: '⏳', proceso: '🔄', completado: '✅' };

    return `
        <div onclick="cycleStatus('${lId}', ${cId ? `'${cId}'` : 'null'}, '${t.id}')" 
            class="p-3 rounded-xl border-l-4 shadow-sm cursor-pointer flex justify-between items-center transition-all hover:translate-x-1 ${st[t.status]}">
            <span class="text-sm font-semibold ${t.status === 'completado' ? 'line-through' : ''}">${t.text}</span>
            <span>${icon[t.status]}</span>
        </div>
    `;
};

render();