const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const taskCounterAside = document.getElementById('taskCounterAside');
const taskCounterSearch = document.getElementById('taskCounterSearch');
const searchInput = document.getElementById('searchInput'); // Nuevo
const searchButton = document.getElementById('searchButton');

const SEARCH_BUTTON_BASE =
    'shrink-0 px-5 py-3 rounded-[1.25rem] text-white font-bold text-sm transition-all hover:shadow-lg active:scale-95 shadow-indigo-500/30';

function getQuery() {
    return searchInput ? searchInput.value.trim() : '';
}

// --- MODO OSCURO (Se mantiene igual) ---
if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        themeIcon.innerText = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.innerText = '☀️';
    }
}

// --- GESTIÓN DE TAREAS ---
let tasks = [];
try {
    const raw = localStorage.getItem('tasks');
    if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            // Solo aceptamos elementos string para que el filtrado no reviente
            tasks = parsed.filter(t => typeof t === 'string');
        }
    }
} catch (err) {
    // Si hay datos corruptos, empezamos limpio
    tasks = [];
}

function renderTasks(filter = '') {
    if (!taskList) return;
    taskList.innerHTML = '';
    const colors = [
        'bg-blue-100 border-blue-300 dark:bg-blue-900/30',
        'bg-purple-100 border-purple-300 dark:bg-purple-900/30',
        'bg-pink-100 border-pink-300 dark:bg-pink-900/30',
        'bg-emerald-100 border-emerald-300 dark:bg-emerald-900/30'
    ];

    // Aplicamos el filtro del buscador
    const query = filter.toLowerCase();
    const filteredTasks = tasks
        .map((t, index) => ({ task: String(t), index }))
        .filter(({ task }) => task.toLowerCase().includes(query));

    filteredTasks.forEach(({ task, index: originalIndex }, renderIndex) => {
        const colorClass = colors[renderIndex % colors.length];
        const div = document.createElement('div');
        div.className = `flex justify-between items-center p-6 rounded-[2rem] border-2 shadow-sm ${colorClass}`;
        
        div.innerHTML = `
            <span class="text-lg font-medium dark:text-slate-200">${task}</span>
            <button onclick="deleteTask(${originalIndex})" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-red-500 hover:text-white transition-all text-red-500 shadow-sm">
                ✕
            </button>
        `;
        taskList.appendChild(div);
    });

    // Contador de tareas pendientes (lado izquierdo)
    if (taskCounterAside) {
        taskCounterAside.innerText = `Tienes ${tasks.length} tareas pendientes`;
    }
    // Contador de tareas filtradas (lado derecho)
    if (taskCounterSearch) {
        taskCounterSearch.innerText = `Tareas encontradas: ${filteredTasks.length}`;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Evento para el buscador
if (searchInput && searchButton) {
    searchInput.addEventListener('input', (e) => {
        renderTasks(e.target.value);
        updateSearchButton();
    });
}

function updateSearchButton() {
    if (!searchInput || !searchButton) return;
    const hasQuery = getQuery().length > 0;

    const bgClass = hasQuery
        ? 'bg-rose-600 hover:bg-rose-700'
        : 'bg-indigo-600 hover:bg-indigo-700';

    searchButton.className = `${SEARCH_BUTTON_BASE} ${bgClass}`;
    searchButton.innerHTML = hasQuery
        ? '<span aria-hidden="true">✕</span> Limpiar'
        : '<span aria-hidden="true">🔍</span> Buscar';
}

if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => {
        const query = getQuery();
        if (query.length > 0) {
            // Limpiamos el input para volver a mostrar todas las tareas.
            searchInput.value = '';
            renderTasks('');
            updateSearchButton();
        } else {
            renderTasks(query);
        }
    });

    updateSearchButton();
}

if (taskForm && taskInput) {
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = taskInput.value.trim();
        if (value) {
            tasks.push(value);
            taskInput.value = '';
            renderTasks();
        }
    });
}

window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
};


//funcion para filtrar las tareas completadas
function filterCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

//funcion para filtrar las tareas pendientes
function filterPendingTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

renderTasks();