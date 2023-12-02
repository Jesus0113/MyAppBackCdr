import { usersManager } from "../DAL/DAOs/mongoDAOs/usersManager.js";
import { cartsService } from "./carts.service.js";
import UsersDto from "../DAL/DTOs/users.dto.js";
import { hashData } from "../utils.js";


class UsersService {
    async findAll() {
        try {
            const response = await usersManager.findAll();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            const response = await usersManager.findUserByEmail(email);
            return response;
        } catch (error) {
            throw error;        }
    }

    async findUserById(id) {
        try {
            const response = await usersManager.findById();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createOne(obj) {

        try {
            const newCart = await cartsService.createCart()
            const hashPassword = await hashData(obj.password);
            // if(!hashPassword) throw new Error('Password can not be hashed')
            const userDTO = new UsersDto({ ...obj, cart: newCart._id, password: hashPassword });
            const response = await usersManager.createOne(userDTO);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(id) {
        try {
            const response = await usersManager.deleteOne(id);
            return response;
        } catch (error) {
            throw error;
        }
    }

}

export const usersService = new UsersService();