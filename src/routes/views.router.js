import { Router } from "express";

import {newProducts} from "../productsManager.js";

const router = Router();

router.get('/', async (req, res) =>{
    const products = await newProducts.getProducts();
    res.render('home', {products})
});

router.get('/realTimeProducts', (req, res) =>{
    res.render('realTimeProducts');
})

export default router;