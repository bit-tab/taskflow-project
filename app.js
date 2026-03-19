const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const taskCounter = document.getElementById('taskCounter');
const searchInput = document.getElementById('searchInput'); // Nuevo
const searchButton = document.getElementById('searchButton');

// --- MODO OSCURO (Se mantiene igual) ---
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

// --- GESTIÓN DE TAREAS ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filter = '') {
    taskList.innerHTML = '';
    const colors = [
        'bg-blue-100 border-blue-300 dark:bg-blue-900/30',
        'bg-purple-100 border-purple-300 dark:bg-purple-900/30',
        'bg-pink-100 border-pink-300 dark:bg-pink-900/30',
        'bg-emerald-100 border-emerald-300 dark:bg-emerald-900/30'
    ];

    // Aplicamos el filtro del buscador
    const filteredTasks = tasks.filter(t => t.toLowerCase().includes(filter.toLowerCase()));

    filteredTasks.forEach((task, index) => {
        const colorClass = colors[index % colors.length];
        const div = document.createElement('div');
        div.className = `flex justify-between items-center p-6 rounded-[2rem] border-2 shadow-sm ${colorClass}`;
        
        div.innerHTML = `
            <span class="text-lg font-medium dark:text-slate-200">${task}</span>
            <button onclick="deleteTask(${index})" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-red-500 hover:text-white transition-all text-red-500 shadow-sm">
                ✕
            </button>
        `;
        taskList.appendChild(div);
    });

    taskCounter.innerText = `Tareas encontradas: ${filteredTasks.length}`;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Evento para el buscador
searchInput.addEventListener('input', (e) => {
    renderTasks(e.target.value);
    updateSearchButton();
});

function updateSearchButton() {
    const hasQuery = searchInput.value.trim().length > 0;

    if (hasQuery) {
        searchButton.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        searchButton.classList.add('bg-rose-600', 'hover:bg-rose-700');
        searchButton.innerHTML = '<span aria-hidden="true">✕</span> Limpiar';
    } else {
        searchButton.classList.remove('bg-rose-600', 'hover:bg-rose-700');
        searchButton.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        searchButton.innerHTML = '<span aria-hidden="true">🔍</span> Buscar';
    }
}

searchButton.addEventListener('click', () => {
    if (searchInput.value.trim().length > 0) {
        // Limpiamos el input para volver a mostrar todas las tareas.
        searchInput.value = '';
        renderTasks('');
        updateSearchButton();
    } else {
        renderTasks(searchInput.value);
    }
});

updateSearchButton();

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (taskInput.value.trim()) {
        tasks.push(taskInput.value.trim());
        taskInput.value = '';
        renderTasks();
    }
});

window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
};

renderTasks();