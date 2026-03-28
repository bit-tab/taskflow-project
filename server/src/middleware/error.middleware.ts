import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log del error para nosotros (en consola)
  console.error(`[ERROR] ${req.method} ${req.url}:`, err.message);

  // Si el error viene de Zod (validación)
  if (err.name === 'ZodError') {
    return res.status(400).json({
      status: 'error',
      message: 'Error de validación',
      errors: err.errors.map((e: any) => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Error genérico 500
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Error interno del servidor'
  });
};