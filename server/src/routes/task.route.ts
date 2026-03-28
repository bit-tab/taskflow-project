import { Router } from 'express';
import { taskController } from '../controllers/task.controller';

const router = Router();

router.get('/', taskController.getAll);
router.post('/', taskController.create);

export default router;