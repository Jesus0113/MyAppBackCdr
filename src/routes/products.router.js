import {Router} from 'express';
import ProductManager from '../productsManager.js';

const router = Router();

  //Instanciar la clase ************
  const newProducts = new ProductManager('/products.json');


router.get('/', async (req, res) => {

    try {
  
       const products = await newProducts.getProducts();
       res.status(200).json({ message: 'Products', products });
  
    } catch (error) {
      res.status(500).json({ error });
    }
  
  });
  
  router.get('/:id', async (req, res) => {
  
    const { id } = req.params;
  
    try {
  
      const product = await newProducts.getProductById(+id);
      res.status(200).json({ message: 'User', product });
  
    } catch (error) {
      res.status(500).json({ error });
    }
  
  });
  
  
  router.post('/', async (req, res) => {
    try {
  
      const newProduct = await newProducts.addProduct(req.body);
      res.status(200).json({ message: 'Product created', product: newProduct })
  
    } catch (error) {
      res.status(500).json({ error });
    }
  
  });
  
  router.put('/:id', async (req, res)=>{
  
    const {id} = req.params;
    try {
  
      const productUpdate = await newProducts.updateProduct(+id, req.body);
      res.status(200).json({message: 'product update',})
      
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  
  router.delete('/:id', async (req, res) => {
  
    const { id } = req.params;
  
    try {
  
      const product = await newProducts.deleteProduct(+id);
  
      res.status(200).json({ message: 'User deleted'});
  
    } catch (error) {
      res.status(500).json({ error });
  
    }
  
  })
  




export default router;