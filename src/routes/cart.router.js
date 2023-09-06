import {Router} from 'express'
import { cartsMongo } from '../Dao/cartManagers/cartManagerMongo.js';

const router = Router();

//Trae todos los carts****
router.get('/', async (req, res) =>{

    try {
        const carts = await cartsMongo.getCart();
        res.status(200).json({messag: 'Carts', carts})

    } catch (error) {
        res.status(401).json({error});
    }

});

//Busca cart por ID****
router.get('/:id', async (req, res) =>{
  const {id} = req.params;
    try {
        const cartFind = await cartsMongo.getCartById(id);
        res.status(200).json({message: 'Cart', cartFind})
    } catch (error) {
        res.status(401).json({error});
    }
});

//Agrega un cart a la BD****
router.post('/', async (req, res) => {
    
    try {
      const newCart = await cartsMongo.addCart(req.body);
      res.status(200).json({ message: 'Cart created', newCart })
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  //Agrega un producto al carrito o suma quantify****

  // ejemplo para agregar producto de a 1 => localhost:8080/api/carts/64f7ea42f1dcf513363add73/products/64f1141f3df21b722056b336

  // ejemplo para agregar producto con diferente quantify => localhost:8080/api/carts/64f7ea42f1dcf513363add73/products/64f1141f3df21b722056b336  **Por body** {"quantify": 5}

router.put('/:idCart/products/:idProd', async (req, res) =>{

//Se obtienen los id del params
  const {idCart, idProd} = req.params;

// Pasamos la cantidad por body si se quiere mas de un producto
  const {quantify} = req.body;

  try {
    
   const addProd = await cartsMongo.addProdCart(idCart,idProd,quantify);
   res.status(200).json({message: 'Product added', cart: addProd});

  } catch (error) {
    res.status(500).json({error})    
  }
});

//Vaciar cart****
router.delete('/:idCart', async (req, res) =>{
  try {
  
    const deleteCart = await cartsMongo.deleteCart(req.params);
    res.status(200).json({message: 'Cart deleted', cart: deleteCart });
  
  } catch (error) {
    res.status(500).json({error})
  }
})

//Elimina product al carrito (baja quantify hasta desaparecer)****
router.delete('/:idCart/products/:idProd', async (req, res) =>{
  const {idCart, idProd} = req.params;
  try {
    const deleteProduct = await cartsMongo.deleteProduct(idCart, idProd);
    res.status(200).json({message: 'Product deleted', product: deleteProduct});    
  } catch (error) {
    res.status(500).json({error})
  }
})




export default router;