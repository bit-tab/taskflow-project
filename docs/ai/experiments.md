# Experimentos de IA. Bitácora de pruebas realizadas integrando IA en el desarrollo de TaskFLow.
Experimento: Programación Tradicional vs. IA (Cursor)

    Parte 1: Problemas Genéricos

     1. Invertir una cadena de texto
 **Sin IA:** Usé un bucle `for` invertido. Tardé 3 minutos. El código es funcional pero básico.
 **Con IA (Cursor):** Usé `Ctrl + K` y pedí "invertir string de forma óptima". Sugirió `split('').reverse().join('')`. Tardé 5 segundos.
 **Comparación:** La IA conoce métodos nativos que ahorran líneas.

     2. Filtrar números pares de un array
**Sin IA:** Creé un nuevo array y usé un `if` dentro de un bucle. Tardé 4 minutos.
**Con IA:** Cursor sugirió usar `.filter()`. Tardé 10 segundos.
**Comparación:** El código de la IA es más "limpio" (declarativo).

     3. Validar un formato de Email
**Sin IA:** Intenté recordar la expresión regular (Regex) y fallé. Tardé 10 minutos buscando en Google.
**Con IA:** Escribí `// función para validar email` y la IA la autocompletó perfecta al instante.
**Comparación:** La IA es imbatible en sintaxis compleja como Regex.


        Parte 2: Tareas del Proyecto TaskFlow

    1. Generar ID único para cada tarea
**Sin IA:** Usé `Math.random()`. Tardé 2 minutos.
**Con IA:** Cursor sugirió `crypto.randomUUID()` para mayor seguridad.
**Resultado:** Mejoró la calidad técnica y seguridad del proyecto.

    2. Formatear la fecha de creación
**Sin IA:** Concatené `getDay()`, `getMonth()`, etc. Muy tedioso. 8 minutos.
**Con IA:** Pedí: "Formatea la fecha a 'hace X minutos' o DD/MM/AAAA". Me dio una función limpia en segundos.
**Resultado:** Ahorro de tiempo masivo.

     3. Persistencia en LocalStorage
**Sin IA:** Recordaba `setItem` pero no cómo manejar el `JSON.parse` correctamente. 10 minutos.
**Con IA:** Con **Composer** (`Ctrl + I`), pedí: "Haz que las tareas se guarden y carguen del LocalStorage". Lo hizo en dos archivos a la vez.
**Resultado:** La IA entiende el contexto global mejor que yo buscando partes sueltas.

---

## Conclusión Final
sin ia requiere mucho tiempo porque tambien hay tiempo de leer documentacion investigar funciones etc
con ia es poner el prompt y en 3-5 mins está listo, pero el nivel de aprendizaje es menor.


PROCESO CON MCP
para instalar mcp he seguido las indicaciones de crear el archivo mcp.json.
no he podido probarlo porque no me he suscrito a cursor y de forma gratuita ya no hace nada. 
por lo que he investigado, mcp puede ser útil en proyectos de gran embergadura, donde en luhgar de tener que proporcionarle a la ia mil archivoa a la vez, ella ouede ir viendo lo que necesita(siempre y cuando tenga tu permiso).