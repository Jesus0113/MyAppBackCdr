import { Router } from "express";
import { productsMongo } from "../Dao/productsManager/productsManagerMongo.js";
import { cartsMongo } from "../Dao/cartManagers/cartManagerMongo.js";
import { usersManager } from "../Dao/usersManagers/usersManager.js";
import { compareData, hashData } from "../utils.js";
import passport from "passport";

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
router.get('/realTimeProducts', async (req, res) => {
    const { username } = req.session;
    const user = await usersManager.findUser(username);

    try {
        if(user){
            if(user.isAdmin){
            const readProducts = await productsMongo.getProducts(req.query);
            const products = await readProducts.payload;
            res.render('realTimeProducts', { products });
            }else{
                res.redirect('/products')
            }         
        }else{
            res.redirect('/');
        }

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
router.get('/products', async (req, res) => {

    const { user } = req.session.passport
     const userdb = await usersManager.findUserById(user);
    
    try {
         if (userdb) {
            const nameUser = await userdb.first_name
            const rol = await userdb.isAdmin ? 'admin' : 'user'
            const readProducts = await productsMongo.getProducts(req.query);
            const products = await readProducts.payload;
            res.render('products', { products, nameUser, rol });
         } else {
             res.redirect('/');
         }
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

        if(user){
            const readCart = await cartsMongo.getCartById(id);
            res.render('cartId', { readCart });
        }else{
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

    const { first_name, last_name, username, password } = req.body;

    try {

        if (!first_name || !last_name || !username || !password) {
            return res.status(400).json({ message: 'Some data is missing' });
        }

        const userFind = await usersManager.findUser(username);

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
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Some data is missing' });
        }

        const userDb = await usersManager.findUser(username);
        if (!userDb) {
            return res.status(400).json({ message: 'Signup first' });
        }

        const validPassword = await compareData(password, userDb.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Username or Password not valid' });
        }

        req.session['username'] = username;

        res.redirect('/products');

    } catch (error) {
        res.status(500).json({ error: "Hubo un error al enviar la informacion del Login" });
    }
});

//passport github

router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github', passport.authenticate('github', 
{failureRedirect:'/', successRedirect:'/products'})
// ,(req, res )=>{
// req.session['username'] = req.user.username
// req.session['isArmin'] = req.user.isAdmin
// }
);

export default router;