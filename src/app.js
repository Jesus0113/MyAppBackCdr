import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from "socket.io";
import './DAL/mongoDB/dbConfig.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './middlewares/passport/passportStrategies.js'
import config from './config.dotenv.js'
import cors from 'cors'

import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import messagesRouter from './routes/messages.router.js';
import usersRouter from './routes/users.router.js';
import { productsMongo } from './DAL/DAOs/mongoDAOs/productsManagerMongo.js';
import { messagesMongo } from './DAL/DAOs/mongoDAOs/messageManagerMongo.js';
import { __dirname } from './utils.js';


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser('secretKeyCookies'));

//Config de session
// app.use(session({
//   store: new MongoStore({
//     mongoUrl:'mongodb+srv://Jesusg0113:1234@cluster0.orikb9z.mongodb.net/ecommerce?retryWrites=true&w=majority',
//     ttl: 1200
//   }),
//   secret: "secretSession",
//   resave: false,
//   saveUninitialized:false,
//   cookie: {maxAge:120000}
// }))

//Config passport

app.use(passport.initialize());
// app.use(passport.session());

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');



// Rutes

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/chat', messagesRouter);
app.use('/', usersRouter );


const PORT = config.port

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT} `);
});

const socketServer = new Server(httpServer);


let messages = [];

socketServer.on('connection', async socket => {
  console.log(`Usuario conectado ${socket.id}`);
  const readProducts = await productsMongo.getProducts({});

  socketServer.emit('initPro', readProducts.payload);
  socket.emit('conectProducts', readProducts);
  socketServer.emit('chat', messages)

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado ${socket.id}`);
  });

  socket.on('productOnline', async prod => {

    const validatorCode = await productsMongo.getProductOne(prod.code);

    if (validatorCode) {
      socket.emit('errorCode');
    } else {
      await productsMongo.addProduct(prod);
      const readProducts = await productsMongo.getProducts({});
      socketServer.emit('allPro', readProducts.payload);
    }
  });

  socket.on('deleteProductForId', async (idDelete) => {

    await productsMongo.deleteProduct(idDelete);
    const readProducts = await productsMongo.getProducts({});

    socketServer.emit('allProDel', readProducts.payload)

  });

  //chat***

  socket.on('message', async (infoMensaje) => {
    messages.push(infoMensaje);

    const addMensj = await messagesMongo.addMessage(infoMensaje);

    socketServer.emit('chat', messages)
  });

  socket.on('userNewConect', user => {
    socket.broadcast.emit('broadcost', user)
  })
})
