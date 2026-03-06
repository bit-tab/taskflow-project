// Seleccionamos elementos
const form = document.querySelector('form');       // El formulario donde escribes la tarea
const input = document.querySelector('input');     // El input de texto
const taskList = document.querySelector('ul');     // La lista donde pondremos las tareas

// Array para guardar las tareas
let tasks = [];

// Escuchar el submit del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue al enviar
    const taskText = input.value.trim(); // Obtenemos el texto del input y quitamos espacios
    if (taskText !== '') {
        addTask(taskText); // Llamamos a la función que añadirá la tarea
        input.value = '';  // Limpiamos el input
    }
});
function addTask(text) {
    const li = document.createElement('li'); // Creamos un nuevo elemento <li>
    li.textContent = text;

    // Creamos botón de borrar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);  // Eliminamos la tarea del DOM
        tasks = tasks.filter(t => t !== text); // Eliminamos del array
        saveTasks(); // Guardamos los cambios
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Guardamos en el array y en LocalStorage
    tasks.push(text);
    saveTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Al cargar la página
window.addEventListener('load', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = savedTasks;
    tasks.forEach(task => addTask(task));
});

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase();
    document.querySelectorAll('li').forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(filter) ? '' : 'none';
    });
});
