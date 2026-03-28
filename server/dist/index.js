"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const task_route_1 = __importDefault(require("./routes/task.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Logger personalizado (Punto 2 de tu lista)
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${res.statusCode} [${duration}ms]`);
    });
    next();
});
// Rutas
app.use('/api/tasks', task_route_1.default);
// Ruta de prueba básica
app.get('/', (req, res) => {
    res.send('API de TaskFlow funcionando 🚀');
});
app.listen(PORT, () => {
    console.log(`
  ✅ Servidor listo en: http://localhost:${PORT}
  📂 Rutas de tareas en: http://localhost:${PORT}/api/tasks
  `);
});
