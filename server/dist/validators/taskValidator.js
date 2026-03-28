"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Mínimo 3 caracteres"),
    priority: zod_1.z.enum(['low', 'medium', 'high'])
});
