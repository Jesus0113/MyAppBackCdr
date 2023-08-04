import { Router } from 'express';
import {newProducts} from '../productsManager.js';
import {upload} from '../middlewares/multer.middleware.js'

const router = Router();




router.get('/', async (req, res) => {

  const {limit=10 } = req.query;
 
  try {

    const products = await newProducts.getProducts();

    if(limit){
      res.status(200).json({message: 'products', products:products.slice(0,limit)})
    }else{
      res.status(200).json({ message: 'Products', products });
    }

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


router.post('/', upload.single('file'), async (req, res) => {
  try {

    const newProduct = await newProducts.addProduct(req.body);
    res.status(200).json({ message: 'Product created', newProduct });
    // res.redirect('/views/products')

  } catch (error) {
    res.status(500).json({ error });
  }

});

router.put('/:id', async (req, res) => {

  const { id } = req.params;
  try {

    const productUpdate = await newProducts.updateProduct(+id, req.body);
    res.status(200).json({ message: 'product update', productUpdate })

  } catch (error) {
    res.status(500).json({ error });
  }
})

router.delete('/:id', async (req, res) => {

  const { id } = req.params;

  try {

    const product = await newProducts.deleteProduct(+id);

    res.status(200).json({ message: 'User deleted' });

  } catch (error) {
    res.status(500).json({ error });

  }

})





export default router;