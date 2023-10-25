import dotenv from 'dotenv';
import program from "./config.commander.js";

const mode = program.opts().mode


dotenv.config({
    path:
        mode === 'testing' 
        ? '.env.testing' 
        : mode === 'development' 
        ? '.env.development' 
        : '.env.stage'
});

export default {
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT,
    
}