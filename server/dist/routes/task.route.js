"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
router.get('/', task_controller_1.taskController.getAll);
router.post('/', task_controller_1.taskController.create);
exports.default = router;
