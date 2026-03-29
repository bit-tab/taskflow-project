# Taskflow Project
# 🚀 TaskFlow Pro

**TaskFlow Pro** es una aplicación de gestión de tareas de alto rendimiento diseñada con un enfoque en la experiencia de usuario (UX) y un diseño moderno "Glassmorphic". Permite organizar proyectos por categorías, realizar seguimientos de estados y visualizar estadísticas en tiempo real.

## ✨ Características Principales
- **Gestión Multi-Proyecto**: Crea listas independientes para diferentes áreas de tu vida.
- **Jerarquía Dinámica**: Organiza tareas dentro de categorías para un control granular.
- **Estados Inteligentes**: Ciclo de estados mediante iconos (Pendiente ⏳, En Proceso 🔄, Hecho ✅).
- **Modo Oscuro OLED**: Interfaz optimizada para pantallas modernas que reduce la fatiga visual.
- **Persistencia Local**: Tus datos se guardan automáticamente en el navegador (LocalStorage).

## 🛠️ Stack Tecnológico
- **HTML5 & CSS3** (Variables personalizadas para temas).
- **Tailwind CSS** (Diseño responsivo y utilitario).
- **Vanilla JavaScript** (Lógica de estado y manipulación del DOM).

## 🚀 Ejemplos de Uso

### Crear tu primer proyecto
1. En la barra superior, escribe "Proyecto Web 2026".
2. Pulsa **CREAR**. Aparecerá una nueva tarjeta vibrante en tu panel.

### Añadir categorías y tareas
1. Dentro de la tarjeta de tu proyecto, pulsa **+ CAT** y escribe "Frontend".
2. Pulsa el botón **+** azul dentro de la categoría "Frontend" para añadir la tarea "Configurar Tailwind".

### Cambiar estados
- Haz clic directamente sobre cualquier tarea para rotar entre sus estados. La leyenda inferior te servirá de guía visual.

---




### 🚀 Tarea 4
# 🚀 TaskFlow Pro - Fullstack Task Management System

Desarrollamos una estructura (Frontend/Backend). El proyecto utiliza TypeScript en todo el stack para garantizar la seguridad del código y Tailwind CSS v4 para una interfaz de usuario de alto rendimiento.

## 🚀 Tecnologías Core
* **React 18**: Biblioteca principal para la interfaz.
* **Vite**: Herramienta de construcción (bundler) ultra rápida.
* **TypeScript**: Tipado estático para reducir errores en tiempo de ejecución.
* **Tailwind CSS v4**: Framework de estilos de última generación.
* **Lucide React**: Set de iconos optimizados.
* **Axios**: Cliente HTTP para la comunicación con la API.

## 🏗️ Arquitectura del Sistema

La aplicación sigue el patrón de diseño **Cliente-Servidor (REST API)**:

* **Frontend (Cliente):** Aplicación Single Page (SPA) desarrollada con React y Vite. Utiliza Axios para la comunicación asíncrona y Lucide-React para la iconografía.
* **Backend (Servidor):** API REST construida con Node.js y Express. Incluye middlewares de registro de peticiones (Logger), manejo centralizado de errores y enrutamiento modular.

### Estructura de Carpetas
```text
taskflow-project/
├── client/                # React + Vite + TypeScript
│   ├── src/
│   │   ├── lib/api.ts     # Cliente Axios y lógica de comunicación
│   │   ├── App.tsx        # Lógica de negocio y UI principal
│   │   └── index.css      # Directivas de Tailwind CSS v4
├── server/                # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/        # Definición de rutas (Endpoints)
│   │   ├── middleware/    # Logs y gestión de errores
│   │   └── index.ts       # Configuración global del servidor
└── README.md              # Documentación técnica

---

# 🛠️ Instrucciones de Instalación

##La aplicación será accesible en: http://localhost:5173