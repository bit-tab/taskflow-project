let projects = JSON.parse(localStorage.getItem('tf_data')) || [];

// --- MODO OSCURO (CORREGIDO) ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const toggleDark = (force) => {
    const isDark = force !== undefined ? force : document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.innerText = isDark ? '☀️' : '🌙';
    // Forzamos el color de fondo del body para evitar el blanco
    document.body.style.backgroundColor = isDark ? '#070a13' : '#fdf2f8';
};

themeToggle.addEventListener('click', () => toggleDark());
if (localStorage.getItem('theme') === 'dark') toggleDark(true);

// --- GESTIÓN DE PROYECTOS ---
const form = document.getElementById('newListForm');
const input = document.getElementById('newListInput');
const workspace = document.getElementById('workspace');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;

    projects.push({
        id: Date.now(),
        name: input.value.trim(),
        tasks: [],
        categories: []
    });

    input.value = '';
    render();
});

window.addTask = (projectId, catId = null) => {
    const text = prompt("¿Qué hay que hacer?");
    if (!text) return;
    const project = projects.find(p => p.id == projectId);
    const newTask = { id: Date.now(), text, status: 'pendiente' };
    
    if (catId) {
        project.categories.find(c => c.id == catId).tasks.push(newTask);
    } else {
        project.tasks.push(newTask);
    }
    render();
};

window.addCategory = (projectId) => {
    const name = prompt("Nombre de la categoría:");
    if (!name) return;
    projects.find(p => p.id == projectId).categories.push({ id: Date.now(), name, tasks: [] });
    render();
};

window.cycleStatus = (projectId, catId, taskId) => {
    const p = projects.find(p => p.id == projectId);
    let t = catId 
        ? p.categories.find(c => c.id == catId).tasks.find(t => t.id == taskId)
        : p.tasks.find(t => t.id == taskId);
    
    const states = ['pendiente', 'proceso', 'hecho'];
    t.status = states[(states.indexOf(t.status) + 1) % states.length];
    render();
};

window.deleteProject = (id) => {
    if(confirm("¿Borrar proyecto?")) {
        projects = projects.filter(p => p.id != id);
        render();
    }
};

// --- RENDERIZADO ---
const render = () => {
    localStorage.setItem('tf_data', JSON.stringify(projects));
    workspace.innerHTML = '';
    
    let total = 0, done = 0;

    projects.forEach(p => {
        const div = document.createElement('div');
        div.className = "glass-card p-8 animate-in fade-in slide-in-from-bottom-4 transition-all";
        
        div.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-black italic text-indigo-600">${p.name}</h3>
                <button onclick="deleteProject(${p.id})" class="text-[10px] font-bold text-red-400 uppercase tracking-tighter">Eliminar</button>
            </div>

            <div class="flex gap-2 mb-6">
                <button onclick="addTask(${p.id})" class="flex-1 py-3 bg-indigo-50 dark:bg-slate-800 rounded-2xl font-bold text-xs">+ TAREA</button>
                <button onclick="addCategory(${p.id})" class="flex-1 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-xs">+ CAT</button>
            </div>

            <div class="space-y-3">${p.tasks.map(t => renderTask(p.id, null, t)).join('')}</div>

            <div class="mt-6 space-y-6">
                ${p.categories.map(c => `
                    <div class="p-4 rounded-[2rem] bg-indigo-50/30 dark:bg-slate-900/40 border border-indigo-100/50 dark:border-slate-800">
                        <div class="flex justify-between items-center mb-3 px-2">
                            <span class="text-[10px] font-black uppercase text-indigo-400">${c.name}</span>
                            <button onclick="addTask(${p.id}, ${c.id})" class="font-bold text-indigo-500">+</button>
                        </div>
                        <div class="space-y-2">${c.tasks.map(t => renderTask(p.id, c.id, t)).join('')}</div>
                    </div>
                `).join('')}
            </div>
        `;
        workspace.appendChild(div);

        // Stats calc
        const allTasks = [...p.tasks, ...p.categories.flatMap(c => c.tasks)];
        total += allTasks.length;
        done += allTasks.filter(t => t.status === 'hecho').length;
    });

    document.getElementById('statTotal').innerText = total;
    document.getElementById('statDone').innerText = done;
};

const renderTask = (pId, cId, t) => `
    <div onclick="cycleStatus(${pId}, ${cId || 'null'}, ${t.id})" 
        class="task-item p-4 rounded-2xl border-2 cursor-pointer flex justify-between items-center font-bold text-sm task-${t.status}">
        <span class="${t.status === 'hecho' ? 'line-through' : ''}">${t.text}</span>
        <span class="text-lg">${t.status === 'pendiente' ? '⏳' : t.status === 'proceso' ? '🔄' : '✅'}</span>
    </div>
`;

render();