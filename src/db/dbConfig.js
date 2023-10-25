import mongoose from 'mongoose';
import config from '../config.dotenv.js'


//Conect DATA BASE

const URI = config.mongo_uri

mongoose.connect(URI)
.then(()=>console.log('Conectado a la Base de datos'))
.catch((error)=>console.log(error))