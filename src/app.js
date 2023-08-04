import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from "socket.io";


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
const httpServer = app.listen(PORT, () => {
  console.log('Escuchando el puerto 8080');
});

const socketServer = new Server(httpServer);

let contendorProducts = [];

socketServer.on('connection', socket =>{
  console.log(`Usuario conectado ${socket.id}`);


  socket.on('disconnect', ()=>{
    console.log(`Usuario desconectado ${socket.id}`);
  })

  socket.on('productOnline', prod =>{
    contendorProducts.push(prod);

    socketServer.emit('allProducts', contendorProducts)


  })
})