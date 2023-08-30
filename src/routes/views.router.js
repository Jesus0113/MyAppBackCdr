import { Router } from "express";
import { productsMongo } from "../Dao/productsManager/productsManagerMongo.js";

const router = Router();

router.get('/', async (req, res) => {

    const { limit, page, sortPrice, ...query } = req.query;


    const queryAct = {

        limit: limit ?? 10,
        page: page ?? 1,
        sortPrice: sortPrice ?? 'asc',
        query: query ?? {}
    }
    
    try {
          const products = await productsMongo.getProducts(queryAct);
          res.render('home', { products });
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder al listado" });
    }

});

router.get('/realTimeProducts', async (req, res) => {

    try {
         const products = await productsMongo.getProducts(req.query);
         res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder a RealTimeProducts" })
    }

})

export default router;