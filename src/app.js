import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from "socket.io";
import './db/dbConfig.js'


import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import {newProducts} from './productsManager.js'
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

app.use('/', viewsRouter);





const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log('Escuchando el puerto 8080');
});

const socketServer = new Server(httpServer);


//  let contendorProducts = [];

socketServer.on('connection', async socket =>{
  console.log(`Usuario conectado ${socket.id}`);
  const readProducts = await newProducts.getProducts();

  socketServer.emit('initPro', readProducts);
  
  socket.on('disconnect', ()=>{
     console.log(`Usuario desconectado ${socket.id}`);
  });

  socket.on('productOnline', async prod =>{
    const readProducts = await newProducts.getProducts();
    const validatorCode = readProducts.find(p =>p.code===prod.code);

    if(validatorCode){

      socket.emit('errorCode');


    }else{
      await newProducts.addProduct(prod);
      readProducts.push(prod);
      socketServer.emit('allPro', readProducts);
    }


  });

  socket.on('deleteProductForId', async (idDelete)=>{

    await newProducts.deleteProduct(+idDelete);
    const readProducts = await newProducts.getProducts();
    
    socketServer.emit('allProDel', readProducts )

  } )
})
