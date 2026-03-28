import { errorHandler } from './middleware/error.middleware';
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

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
app.use('/api/tasks', taskRoutes);

// Ruta de prueba básica
app.get('/', (req: Request, res: Response) => {
  res.send('API de TaskFlow funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`
  ✅ Servidor listo en: http://localhost:${PORT}
  📂 Rutas de tareas en: http://localhost:${PORT}/api/tasks
  `);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});