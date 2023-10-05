import { Router } from "express";
import { productsMongo } from "../Dao/productsManager/productsManagerMongo.js";
import { cartsMongo } from "../Dao/cartManagers/cartManagerMongo.js";
import { usersManager } from "../Dao/usersManagers/usersManager.js";
import { compareData, generateToken, hashData } from "../utils.js";
import passport from "passport";
import { jwtValidation } from '../middlewares/jwt.middleware.js'
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


//Todos los productos
//se cambia de ('/') a ('/allproducts') 

router.get('/allProducts', async (req, res) => {

    try {
        const readProducts = await productsMongo.getProducts(req.query);

        const products = await readProducts.payload;

        res.render('home', { products });
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder al listado" });
    }

});

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

//Messages
router.get('/chat', async (req, res) => {

    try {
        res.render('chat');
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder al listado" });
    }
});

//Muestra productos disponibles para add a cart se pagina con limit=(nro de products deseados) pag=(nro de pagina deseada)
// ejemplo si se quiere paginar => http://localhost:8080/products?limit=2&page=2&sortPrice=ASC
router.get('/products', jwtValidation, authMiddleware(['premium', 'admin', 'user']), async (req, res) => {

    // const { user } = req.session.passport
    //  const userdb = await usersManager.findUserById(user);
    const { first_name, email, role } = req.user;
    try {

        const readProducts = await productsMongo.getProducts(req.query);
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

//Muestra un cart individual con populate
router.get('/cart/:id', async (req, res) => {

    const { username } = req.session;
    const user = await usersManager.findUser(username);
    const { id } = req.params;

    try {

        if (user) {
            const readCart = await cartsMongo.getCartById(id);
            res.render('cartId', { readCart });
        } else {
            res.redirect('/');
        }

    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder este Cart" })
    }
});



// ** Registro y Login **

//Registro

//lleva al registro
router.get('/registro', async (req, res) => {
    try {
        res.render('registro');
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder al Registro" });
    }
});

//Agrega al usuario
router.post('/registro', async (req, res) => {

    const { first_name, last_name, email, password, age } = req.body;

    try {
        if (!first_name || !last_name || !email || !password || !age) {
            return res.status(400).json({ message: 'Some data is missing' });
        }
        const userFind = await usersManager.findUser(email);
        if (userFind) {
            return res.status(400).json({ message: 'Username already used' });
        }
        const hashPassword = await hashData(password);
        const newUser = await usersManager.addUser({ ...req.body, password: hashPassword });
        res.status(200).json({ message: 'User created', user: newUser })
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al intentar enviar informacion por el formulario" });
    }
});

//Login

//lleva al login
router.get('/', async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al acceder al Login" });
    }
});

//envia login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Some data is missing' });
        }

        const userDb = await usersManager.findUser(email);
        if (!userDb) {
            return res.status(400).json({ message: 'Signup first' });
        }

        const validPassword = await compareData(password, userDb.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Username or Password not valid' });
        }

        const token = generateToken(userDb)

        // req.session['username'] = username;

        res.status(200).cookie('token', token).redirect('/products');

    } catch (error) {
        res.status(500).json({ error: "Hubo un error al enviar la informacion del Login" });
    }
});

//passport github

router.get('/login/github', passport.authenticate('github', { scope: ['user:email'] }));

//callBack github

router.get('/github', passport.authenticate('github',
    { failureRedirect: '/', successRedirect: '/products' })
    // ,(req, res )=>{
    // req.session['username'] = req.user.username
    // req.session['isArmin'] = req.user.isAdmin
    // }
);

//jwt validation
// router.get('validation', jwtValidation, (req, res)=>{
//     res.send('prueba')
// })

//jwt validation passport

router.get('/validation', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Probando')

})

export default router;