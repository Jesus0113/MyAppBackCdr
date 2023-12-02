import { usersModel } from "../../mongoDB/models/users.model.js";
import BasicMongo from "./basicMongo.js";

class UsersManager extends BasicMongo {
    constructor(){
        super(usersModel);
    }

    //Encuentra un usuario a la BD
    async findUserByEmail (email){
        try {
            const user = await usersModel.findOne({email})
            return user;            
        } catch (error) {
            throw error;
        }
    };


}

export const usersManager = new UsersManager()