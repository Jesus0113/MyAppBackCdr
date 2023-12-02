import { Router } from "express";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { chatController } from "../controllers/chat.controller.js";

const router = Router();

//Messages
router.get('/', jwtValidation, authMiddleware(['user']), chatController.redirecChat);


export default router;