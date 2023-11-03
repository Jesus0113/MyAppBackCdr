import { usersManager } from "../DAL/DAOs/mongoDAOs/usersManager.js";
import UsersDto from "../DAL/DTOs/users.dto.js";
import { hashData } from "../utils.js";


class UsersService {
    async findAll(){
        try {
            const response = await usersManager.findAll();
            return response;            
        } catch (error) {
            return error;
        }
    }

    async findUserByEmail(email){
        try {
            const response = await usersManager.findUserByEmail(email);
            return response;            
        } catch (error) {
            return error;
        }
    }

    async createOne(obj){

        try {
            const hashPassword = hashData(obj.password);
            if(!hashPassword) throw new Error('Password can not be hashed')
            const userDTO = new UsersDto({...obj, password: hashPassword});
            const response = await usersManager.createOne(userDTO);
            return response;            
        } catch (error) {
            return error;            
        }
    }

    async deleteOne(id){
        try {
            const response = await usersManager.deleteOne(id);
            return response;            
        } catch (error) {
            return error;
        }
    }

}

export const usersService = new UsersService();