import { messagesModel } from "../../mongoDB/models/messages.model.js";
import BasicMongo from './basicMongo.js';

class MessagesManager extends BasicMongo {
    constructor(){
        super(messagesModel)
    }

}


//Instanciar la clase ************
export const messagesMongo = new MessagesManager();