import { Router } from 'express';
import { productsController } from '../controllers/products.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import { jwtValidation } from '../middlewares/jwt.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

//Trae todos los productos en la BD segun las especificaciones que pasemos por query params
router.get('/', productsController.findAllProducts);

//Trae un producto por su ID
router.get('/:id', productsController.findOneProductById);

//Crea un producto (el Upload es Multer)
router.post('/', upload.single('file'), productsController.createOneProduct);

//Modidica un producto
router.put('/:id', productsController.updateProduct);

//Elimina un producto por id
router.delete('/:id', productsController.deleteProductById);

//******************************/

//form para agg y delete product en tiempo real
router.get('/realTimeProducts', jwtValidation, authMiddleware(['premium', 'admin',]), async (req, res) => {
    // const { email } = req.session;
    // const user = await usersManager.findUser(username);
    const { role } = req.user;
    try {
        const readProducts = await productsMongo.getProducts(req.query);
        const products = await readProducts.payload;
        res.render('realTimeProducts', { products });
        // if (role) {
        //     if (user.isAdmin) {
        //         // const readProducts = await productsMongo.getProducts(req.query);
        //         // const products = await readProducts.payload;
        //         // res.render('realTimeProducts', { products });
        //     } else {
        //         res.redirect('/products')
        //     }
        // } else {
        //     res.redirect('/');
        // }

    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder a RealTimeProducts" })
    }
});

//Muestra productos disponibles para add a cart se pagina con limit=(nro de products deseados) pag=(nro de pagina deseada)
// ejemplo si se quiere paginar => http://localhost:8080/products?limit=2&page=2&sortPrice=ASC
router.get('/products', jwtValidation, authMiddleware(['premium', 'admin', 'user']), async (req, res) => {

    // const { user } = req.session.passport
    //  const userdb = await usersManager.findUserById(user);
    const { first_name, email, role } = req.user;
    try {

        const readProducts = await productsController.findAllProducts(req.query);
        const products = await readProducts.payload;
        res.render('products', { products, first_name, role });

        //  if (userdb) {
        //     const nameUser = await userdb.first_name
        //     const rol = await userdb.isAdmin ? 'admin' : 'user'
        //     // const readProducts = await productsMongo.getProducts(req.query);
        //     // const products = await readProducts.payload;
        //     // res.render('products', { products, nameUser, rol });
        //  } else {
        //      res.redirect('/');
        //  }
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder a los productos" })
    }
});




export default router;