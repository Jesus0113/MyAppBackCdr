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
    async findUser (email){
        try {
            const user = await usersModel.findOne({email})
            return user;            
        } catch (error) {
            return error;            
        }
    };

    //Encuentra un usuario a la BD por id

    async findUserById(id){

        try {
            const user = await usersModel.findById(id)
            return user; 
        } catch (error) {
            return error;            
        }

    }




}

export const usersManager = new UsersManager()