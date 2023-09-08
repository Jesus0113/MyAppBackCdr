import { usersModel } from "../models/users.model.js";

class UsersManager {

//Agrega un usuario a la BD
    async addUser (user){
        try {
            const newUser = await usersModel.create(user);
            return newUser;

        } catch (error) {
            return error
        }
    };

    //Encuentra un usuario a la BD
    async findUser (username){
        try {
            const user = await usersModel.findOne({username})
            return user;            
        } catch (error) {
            return error;            
        }
    };




}

export const usersManager = new UsersManager()