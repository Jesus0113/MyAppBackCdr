import {Router} from 'express'

import CartManager from '../cartManager.js';

const router = Router();


//Instanciar la clase ************
const newCartsManager = new CartManager('./cart.json');

router.get('/', async (req, res) =>{

  const {limit} = req.query;
    try {

        const carts = await newCartsManager.getCart();

        if(limit){
          res.status(200).json({message: 'Carts', carts: carts.slice(0,limit)}); 
        }else{
          res.status(200).json({message: 'Carts', carts: carts}); 
        }       
    } catch (error) {
        res.status(401).json({error});
    }

});


router.post('/', async (req, res) => {
    
    try {
  
      const newCart = await newCartsManager.addCart();
      res.status(200).json({ message: 'Cart created', newCart })
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.post('/:idCart/products/:idProd', async (req, res) =>{

  const {idCart, idProd} = req.params;
  try {

   const addProd = await newCartsManager.addProdCart(+idCart,+idProd);

    
  } catch (error) {
    res.status(500).json({error})    
  }

});




export default router;