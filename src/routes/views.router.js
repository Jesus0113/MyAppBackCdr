import { Router } from "express";
import { cartsMongo } from "../DAL/DAOs/mongoDAOs/cartManagerMongo.js";
import { usersManager } from "../DAL/DAOs/mongoDAOs/usersManager.js";

const router = Router();

//Muestra un cart individual con populate
router.get('/cart/:id', async (req, res) => {

    const { username } = req.session;
    const user = await usersManager.findUser(username);
    const { id } = req.params;

    try {

        if (user) {
            const readCart = await cartsMongo.getCartById(id);
            res.render('cartId', { readCart });
        } else {
            res.redirect('/');
        }

    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder este Cart" })
    }
});

//Messages
router.get('/chat', async (req, res) => {

    try {
        res.render('chat');
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder al listado" });
    }
});


export default router;