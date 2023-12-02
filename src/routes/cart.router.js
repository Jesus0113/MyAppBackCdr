import {Router} from 'express';
import { cartsController } from '../controllers/carts.controller.js';
import { cartsMongo } from '../DAL/DAOs/mongoDAOs/cartManagerMongo.js';

const router = Router();

//Trae todos los carts****
router.get('/', cartsController.findAllCarts);

//Busca cart por ID****
router.get('/:id', cartsController.findOneCartById);

//Agrega un cart a la BD****
router.post('/', cartsController.createCart);

  
//Agrega un producto al carrito o suma quantify****
  
// ejemplo para agregar producto de a 1 => localhost:8080/api/carts/64f7ea42f1dcf513363add73/products/64f1141f3df21b722056b336
  
// ejemplo para agregar producto con diferente quantify => localhost:8080/api/carts/64f7ea42f1dcf513363add73/products/64f1141f3df21b722056b336  **Por body** {"amount": 5}
router.post('/:idCart/products/:idProd', cartsController.updateCart);

//Vaciar cart****
router.delete('/:idCart', cartsController.deleteCartById);

//Elimina product al carrito (baja quantify hasta desaparecer)****
router.delete('/:idCart/products/:idProd', cartsController.deleteProductFromCart);

router.post('/:idCart/purchase',cartsController.purchaseCompleted);

export default router;