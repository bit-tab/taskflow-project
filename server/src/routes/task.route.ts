import { Router } from 'express';
import { taskController } from '../controllers/task.controller';

const router = Router();

router.get('/', taskController.getAll);           // Listar todas
router.get('/:id', taskController.getOne);        // Obtener una
router.post('/', taskController.create);          // Crear
router.put('/:id', taskController.update);        // Actualizar todo
router.patch('/:id/toggle', taskController.toggle); // Cambiar estado check/uncheck
router.delete('/:id', taskController.delete);     // Eliminar

export default router;