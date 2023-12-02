import { Router } from 'express';
import { productsController } from '../controllers/products.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import { jwtValidation } from '../middlewares/jwt.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();
//Trae todos los productos en la BD segun las especificaciones que pasemos por query params
router.get('/', productsController.findAllProducts);
//Trae un producto por su ID
router.get('/find/:id', productsController.findOneProductById);
//Crea un producto (el Upload es Multer)
router.post('/', upload.single('file'), productsController.createOneProduct);
//Modidica un producto
router.put('/:id', productsController.updateProduct);
//Elimina un producto por id
router.delete('/:id', productsController.deleteProductById);
//******************************/
//form para agg y delete product en tiempo real
router.get('/realTimeProducts', jwtValidation, authMiddleware(['premium', 'admin', 'user']), productsController.realTimeProducts);
// api/products/productsAdmin
//Muestra productos disponibles para add a cart se pagina con limit=(nro de products deseados) pag=(nro de pagina deseada)
 // ejemplo si se quiere paginar => http://localhost:8080/products?limit=2&page=2&sortPrice=ASC
 router.get('/AdminUser', jwtValidation, authMiddleware(['user']),  productsController.allProductsAdmin);


export default router;