import { Router } from 'express';
import { productsMongo } from '../Dao/productsManager/productsManagerMongo.js';
import {upload} from '../middlewares/multer.middleware.js';

const router = Router();



//Trae todos los productos en la BD segun las especificaciones que pasemos por query params
router.get('/', async (req, res) => {
 
  try {

    const products = await productsMongo.getProducts(req.query);
   
    res.status(200).json({ message: 'Products', products });

  } catch (error) {
    res.status(500).json({ error });
  }
});

//Trae un producto por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {

    const product = await productsMongo.getProductById(id);
    res.status(200).json({ message: 'User', product });

  } catch (error) {
    res.status(500).json({ error });
  }
});

//Crea un producto (el Upload es Multer)
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const newProduct = await productsMongo.addProduct(req.body);
    res.status(200).json({ message: 'Product created', newProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//Modidica un producto
router.put('/:id', async (req, res) => {

  const { id } = req.params;
  try {

    const productUpdate = await productsMongo.updateProduct(id, req.body);
    res.status(200).json({ message: 'product update', productUpdate })

  } catch (error) {
    res.status(500).json({ error });
  }
})

//Elimina un producto por id
router.delete('/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const product = await productsMongo.deleteProduct(+id);
    res.status(200).json({ message: 'User deleted', product });
  } catch (error) {
    res.status(500).json({ error });

  }

})



export default router;