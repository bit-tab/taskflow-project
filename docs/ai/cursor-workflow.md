# Workflow con Cursor. Aqui docunmentaré atajos y trucos aprendidos usando ese editor.
atajos usados : CTRL+Ñ para abrir la terminal
CTRL + L para abrir el chat con la IA.


probando el autocompletado. ABrimos un .js y solo al excribir lo que figura entre "" ya pude completar todoo lo demas solo con el tabulador.
"//funcions probar autoc" ompletado de cursor
function sumar(a, b) {
  return a + b;
}

console.log(sumar(1, 2));

//funcions probar autocompletado de cursor
function multiplicar(a, b) {
  return a * b;
}

console.log(multiplicar(1, 2));

//funcions probar autocompletado de cursor
function dividir(a, b) {
  return a / b;
}

console.log(dividir(1, 2));

//////////////////////////////////////////
cursor ha mejorado por si solo el botón de busqueda de mi página de taskflow.
//////////////////////////////////////////
continueando con 2.3 :
escribimos en cursor lo siguiente relativo a app.js:
    "Analiza este archivo y dime 5 puntos específicos donde el código sea repetitivo, las variables tengan nombres poco claros o falten validaciones."

cursor nos devuelve lo siguiente:
  ID duplicado para taskCounter (ambigüedad)

En index.html tienes id="taskCounter" dos veces. En app.js, const taskCounter = document.getElementById('taskCounter'); solo apunta a uno de los dos.
Resultado: puedes ver que el contador “no cuadra” según qué elemento querías actualizar.
Recomendación: usa IDs únicos (p. ej. taskCounterAside vs taskCounterSearch) o selecciona por querySelector más específico.
Bug de borrado: índice incorrecto cuando hay filtro

En renderTasks, haces filteredTasks.forEach((task, index) => ... onclick="deleteTask(${index})" ...).
Pero deleteTask hace tasks.splice(index, 1), donde index corresponde al array filtrado (filteredTasks), no al array original (tasks).
Resultado: al buscar, borrar puede eliminar la tarea equivocada.
Recomendación: pasar un identificador real (o el índice original dentro de tasks) en vez del index del filtrado.
Repetición en updateSearchButton()

Tienes dos ramas casi gemelas: searchButton.classList.remove(...), classList.add(...) y asignación de innerHTML.
Recomendación: centraliza clases/textos en constantes (o crea una función que reciba el estado) para no duplicar lógica.
Repetición del mismo cálculo del query

En updateSearchButton() y en el handler del botón haces searchInput.value.trim().length > 0 y repites lógica similar.
Recomendación: crea un helper tipo getQuery() que devuelva searchInput.value.trim() y úsalo en ambos sitios.
Faltan validaciones/robustez con localStorage

let tasks = JSON.parse(localStorage.getItem('tasks')) || []; asume que lo guardado siempre es un array de strings.
Luego haces tasks.filter(t => t.toLowerCase().includes(...)); si algún elemento no es string (o tasks no es array), se rompe.
Recomendación: valida que sea array y que cada elemento sea string antes de filtrar (por ejemplo, normalizando a strings o descartando valores inválidos), y también valida que existan searchInput/searchButton antes de registrar listeners.
////////////////////////////////////////////