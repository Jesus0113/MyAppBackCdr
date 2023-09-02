import { Router } from "express";
import { productsMongo } from "../Dao/productsManager/productsManagerMongo.js";
import { cartsMongo } from "../Dao/cartManagers/cartManagerMongo.js";
import { messagesMongo } from "../Dao/messagesManagers/messageManagerMongo.js";

const router = Router();


//Todos los productos
router.get('/', async (req, res) => {

    try {
        const readProducts = await productsMongo.getProducts(req.query);

        const products = await readProducts.payload;

        res.render('home', { products });
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder al listado" });
    }

});

//form para agg y delete product en tiempo real
router.get('/realTimeProducts', async (req, res) => {

    try {
        const readProducts = await productsMongo.getProducts(req.query);

        const products = await readProducts.payload;

        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder a RealTimeProducts" })
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


//Muestra productos disponibles para add a cart se pagina con limit=(nro de products deseados) pag=(nro de pagina deseada)
router.get('/products', async (req, res) => {

    try {
        const readProducts = await productsMongo.getProducts(req.query);

        const products = await readProducts.payload;

        res.render('products', { products });

    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder a los productos" })
    }
});

//Muestra un cart individual con populate
router.get('/cart/:id', async (req, res) => {

    const {id} = req.params;
    try {

         const readCart = await cartsMongo.getCartById(id);
         res.render('cartId', { readCart });

    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder este Cart" })
    }
})

export default router;