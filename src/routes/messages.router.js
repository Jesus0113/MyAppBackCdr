import { Router } from "express";

const router = Router();

//Messages
router.get('/', async (req, res) => {
    try {
        res.render('chat');
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder al listado" });
    }
});


export default router;