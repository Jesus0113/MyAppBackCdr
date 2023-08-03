import { Router } from "express";

import {newProducts} from "../productsManager.js";

const router = Router();

router.get('/', (req, res) =>{
    res.render('addProduct')
});

router.get('/products', async (req, res) =>{
    const products = await newProducts.getProducts();
    res.render('products', {products})
})

export default router;