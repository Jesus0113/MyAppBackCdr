import express from 'express';


import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import { __dirname } from './utils.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))



// Rutes

app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter);





app.listen(8080, () => {
  console.log('Escuchando el puerto 8080');
})