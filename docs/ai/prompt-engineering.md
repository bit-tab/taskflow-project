# Prompt Engineering. Notas sobre como redactar mejores instrucciones para obtener resultados precisos.
# Guía Rápida: Prompts Efectivos para Devs 

### 1. Código nivel Senior (Rol)
*   **Prompt:** "Actúa como un Desarrollador Senior experto en Clean Code. Refactoriza esta función para que sea más legible y eficiente aplicando principios SOLID."
*   **Por qué funciona:** Estableces un estándar de calidad alto y fuerzas a la IA a usar terminología técnica precisa.

### 2. Pensar antes de actuar (Razonamiento)
*   **Prompt:** "Analiza esta lógica. Primero, explícame paso a paso cómo funciona; segundo, identifica posibles fallos de seguridad; tercero, proponme la solución en código."
*   **Por qué funciona:** El "paso a paso" reduce errores lógicos al obligar a la IA a procesar el problema antes de escribir una sola línea.

### 3. Guíala con ejemplos (Few-Shot)
*   **Prompt:** "Convierte estos objetos siguiendo este patrón: [Ejemplo A -> Resultado B]. Ahora haz lo mismo con este: [Nuevo Objeto]."
*   **Por qué funciona:** Los ejemplos eliminan cualquier ambigüedad en transformaciones de datos complejas.

### 4. Pon límites claros (Restricciones)
*   **Prompt:** "Genera un componente de React para un login. Restricciones: No uses librerías externas, usa Tailwind CSS y maneja el estado con useReducer."
*   **Por qué funciona:** Evitas que la IA tome "atajos" o use tecnologías que no encajan en tu stack actual.

### 5. Documentación lista para usar
*   **Prompt:** "Genera la documentación técnica de esta función en formato JSDoc. Incluye descripción, tipos, retornos y un ejemplo de uso real."
*   **Por qué funciona:** Estructura la salida para que sea profesional y la puedas copiar y pegar directamente.

### 6. Romper el código (Unit Testing)
*   **Prompt:** "Ponte en modo QA Engineer. Escribe 5 tests unitarios en Jest para esta función, cubriendo casos de éxito, valores nulos y casos límite (edge cases)."
*   **Por qué funciona:** Al cambiar el rol a QA, la IA se enfoca en encontrar errores y puntos ciegos que un dev suele pasar por alto.

### 7. Optimización algorítmica
*   **Prompt:** "Revisa este bucle y optimízalo para bajar la complejidad de O(n2) a O(n). Explícame la diferencia de rendimiento."
*   **Por qué funciona:** Usar términos de algoritmos la obliga a buscar la solución más eficiente, no solo la que funcione.

### 8. Aprender conceptos (Exploración)
*   **Prompt:** "Explícame cómo funciona el patrón Observer en TypeScript como si fuera un desarrollador junior. Usa una analogía de la vida real."
*   **Por qué funciona:** Es perfecto para entender conceptos nuevos sin lenguaje excesivamente críptico.

### 9. Caza de bugs (Debugging)
*   **Prompt:** "Este código lanza un 'TypeError: Cannot read property of undefined'. Analiza el flujo de datos y dime en qué línea falla y cómo arreglarlo."
*   **Por qué funciona:** Darle el error específico ayuda a la IA a localizar el fallo exacto en el contexto de tu código.

### 10. Migraciones rápidas
*   **Prompt:** "Migra este componente de JavaScript a TypeScript estricto. Define interfaces para todas las props y estados."
*   **Por qué funciona:** Automatiza la tarea pesada de tipado manteniendo la seguridad de tu proyecto.
