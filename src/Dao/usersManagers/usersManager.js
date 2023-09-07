import { usersModel } from "../models/users.model.js";

class UsersManager {

    
    async addUser (user){
        try {
            const newUser = await usersModel.addUser(user);
            return newUser;

        } catch (error) {
            return error
        }
    };

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