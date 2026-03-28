// --- SELECTORES ---
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const taskCounterAside = document.getElementById('taskCounterAside');
const taskCounterSearch = document.getElementById('taskCounterSearch');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

// --- ESTADO DE LA APP ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all'; // 'all' | 'pending' | 'completed'

// --- MODO OSCURO ---
const initTheme = () => {
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.innerText = '☀️';
    }
};

themeToggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    if (themeIcon) themeIcon.innerText = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// --- FUNCIONALIDADES CORE ---

// 1. Guardar en LocalStorage
const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// 2. Renderizado con Filtros y Búsqueda
function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = '';
    
    const query = searchInput.value.toLowerCase();

    // Lógica de filtrado combinada (Buscador + Botones de estado)
    const filteredTasks = tasks.filter(t => {
        const matchesSearch = t.text.toLowerCase().includes(query);
        const matchesFilter = 
            currentFilter === 'all' ? true :
            currentFilter === 'pending' ? !t.completed :
            t.completed;
        return matchesSearch && matchesFilter;
    });

    const colors = [
        'bg-blue-100 border-blue-300 dark:bg-blue-900/30',
        'bg-purple-100 border-purple-300 dark:bg-purple-900/30',
        'bg-pink-100 border-pink-300 dark:bg-pink-900/30',
        'bg-emerald-100 border-emerald-300 dark:bg-emerald-900/30'
    ];

    filteredTasks.forEach((t, index) => {
        const colorClass = colors[index % colors.length];
        const isCompleted = t.completed ? 'opacity-50 line-through' : '';
        
        const div = document.createElement('div');
        div.className = `flex justify-between items-center p-5 rounded-[2rem] border-2 transition-all shadow-sm ${colorClass} ${isCompleted}`;
        
        div.innerHTML = `
            <div class="flex items-center gap-4 flex-1">
                <input type="checkbox" ${t.completed ? 'checked' : ''} 
                    onclick="toggleTask('${t.id}')" 
                    class="w-6 h-6 rounded-full border-2 border-indigo-500 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                <span class="text-lg font-medium dark:text-slate-200 cursor-pointer" onclick="editarTarea('${t.id}')">${t.text}</span>
            </div>
            <div class="flex gap-2">
                <button onclick="editarTarea('${t.id}')" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-indigo-500 hover:text-white transition-all text-indigo-500">
                    ✏️
                </button>
                <button onclick="deleteTask('${t.id}')" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-red-500 hover:text-white transition-all text-red-500">
                    ✕
                </button>
            </div>
        `;
        taskList.appendChild(div);
    });

    // Actualizar contadores
    const pendingCount = tasks.filter(t => !t.completed).length;
    if (taskCounterAside) taskCounterAside.innerText = `Tienes ${pendingCount} tareas pendientes`;
    if (taskCounterSearch) taskCounterSearch.innerText = `Mostrando ${filteredTasks.length} tareas`;
    
    saveToLocalStorage();
}

// 3. Event Listeners para Búsqueda y Filtros
searchInput?.addEventListener('input', renderTasks);

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Estilo visual de botones
        filterButtons.forEach(b => b.classList.remove('bg-white', 'dark:bg-slate-600', 'shadow-sm'));
        btn.classList.add('bg-white', 'dark:bg-slate-600', 'shadow-sm');
        
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// 4. CRUD de Tareas
taskForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({
            id: Date.now().toString(),
            text,
            completed: false
        });
        taskInput.value = '';
        renderTasks();
    }
});

window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    renderTasks();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
};

// 5. Función Editar Tarea (Prompt)
window.editarTarea = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const nuevoTexto = prompt("Edita tu tarea:", task.text);
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        task.text = nuevoTexto.trim();
        renderTasks();
    }
};

// Inicializar
initTheme();
renderTasks();