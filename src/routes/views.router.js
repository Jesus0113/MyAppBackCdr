import { Router } from "express";
import { productsMongo } from "../Dao/productsManager/productsManagerMongo.js";
import { cartsMongo } from "../Dao/cartManagers/cartManagerMongo.js";

const router = Router();

router.get('/', async (req, res) => {

    try {
        const readProducts = await productsMongo.getProducts(req.query);

        const products = await readProducts.payload;

        res.render('home', { products });
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder al listado" });
    }

});

router.get('/realTimeProducts', async (req, res) => {

    try {
        const readProducts = await productsMongo.getProducts(req.query);

        const products = await readProducts.payload;

        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder a RealTimeProducts" })
    }

});

router.get('/products', async (req, res) => {

    try {
        const readProducts = await productsMongo.getProducts(req.query);

        const products = await readProducts.payload;

        res.render('products', { products });

    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder a los productos" })
    }
});

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