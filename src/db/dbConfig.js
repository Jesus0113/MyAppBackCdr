import mongoose from 'mongoose';

//Conect DATA BASE

const URI = 'mongodb+srv://Jesusg0113:1234@cluster0.orikb9z.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI)
.then(()=>console.log('Conectado a la Base de datos'))
.catch((error)=>console.log(error))