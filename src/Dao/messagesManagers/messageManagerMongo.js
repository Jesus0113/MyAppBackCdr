import { messagesModel } from "../models/messages.model.js";

class MessagesManager{
    constructor(){
    }

    async getMessages(){
        try {
            const getMessages = await messagesModel.find({});
            return getMessages;
        } catch (error) {
            return error;            
        }
    }

    async addMessage(obj){
        try {
            const addMessage = await messagesModel.create(obj);
            return addMessage;
        } catch (error) {
            return error;
        }
    }

    async deleteMessage(id){
        try {
            const deleteMessage = await messagesModel.findByIdAndDelete(id);
            return deleteMessage;
        } catch (error) {
            return error;  
        }
    }



}


//Instanciar la clase ************
export const messagesMongo = new MessagesManager();