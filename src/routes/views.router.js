import { Router } from "express";

import {newProducts} from "../managers/productsManager/productsManagerFileS.js";

const router = Router();

router.get('/', async (req, res) =>{
    const products = await newProducts.getProducts();
    res.render('home', {products})
});

router.get('/realTimeProducts', async (req, res) =>{
    const products = await newProducts.getProducts();
    console.log(products);
    res.render('realTimeProducts', {products});
})

export default router;