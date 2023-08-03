import express from 'express';
import { engine } from 'express-handlebars';


import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');



// Rutes

app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter);

app.use('/views', viewsRouter)




const PORT = 8080;
app.listen(PORT, () => {
  console.log('Escuchando el puerto 8080');
})