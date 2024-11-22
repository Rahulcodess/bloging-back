"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBloginput = exports.createBloginput = exports.signininput = exports.signupinput = void 0;
const zod_1 = require("zod");
exports.signupinput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional(),
});
exports.signininput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional(),
});
exports.createBloginput = zod_1.z.object({
    content: zod_1.z.string(),
    title: zod_1.z.string()
});
exports.updateBloginput = zod_1.z.object({
    content: zod_1.z.string(),
    title: zod_1.z.string(),
    id: zod_1.z.string()
});
