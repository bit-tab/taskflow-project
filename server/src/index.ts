import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.route';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. Logger personalizado
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} [${duration}ms]`);
  });
  next();
});

// 3. Rutas
// Importante: Vercel usará el prefijo /api que definamos en vercel.json
app.use('/api/tasks', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API de TaskFlow funcionando en Vercel 🚀');
});

// 4. Manejo de errores
app.use(errorHandler);

// EXPORTACIÓN CRÍTICA PARA VERCEL
export default app;