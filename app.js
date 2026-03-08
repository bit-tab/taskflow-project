// Seleccionamos elementos
const form = document.querySelector('form');           // Formulario para añadir tarea
const input = document.querySelector('form input');    // Input del formulario
const taskList = document.getElementById('task-list'); // Lista donde van las tareas
const searchInput = document.getElementById('search');// Input de búsqueda

// Array para almacenar tareas
let tasks = [];

// Escuchar el submit del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita recargar la página
    const taskText = input.value.trim(); // Texto sin espacios al inicio/final
    if (taskText !== '') {
        addTask(taskText);
        input.value = ''; // Limpiar input
    }
});

// Función para añadir tarea al DOM y al array
function addTask(text) {
    const li = document.createElement('li');
    li.textContent = text;

    // Botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);              // Eliminar del DOM
        tasks = tasks.filter(t => t !== text); // Eliminar del array
        saveTasks();                            // Guardar cambios
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Añadir al array y guardar
    tasks.push(text);
    saveTasks();
}

// Guardar tareas en LocalStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas al iniciar la aplicación
window.addEventListener('load', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = savedTasks;
    tasks.forEach(task => addTask(task));
});

// Filtro de búsqueda (bonus)
searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase();
    document.querySelectorAll('#task-list li').forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(filter) ? '' : 'none';
    });
});;
// Botón modo oscuro
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function() {
        document.documentElement.classList.toggle("dark");
    });
}