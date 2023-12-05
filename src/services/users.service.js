import { usersManager } from "../DAL/DAOs/mongoDAOs/usersManager.js";
import { cartsService } from "./carts.service.js";
import UsersDto from "../DAL/DTOs/users.dto.js";
import { hashData } from "../utils.js";
import {transporter} from '../nodemailer.js'


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

    async validateUser(email) {
        try {
            const response = await usersManager.findUserByEmail(email);

            if(response){
                return true
            }else{
                return false
            }
        } catch (error) {
            throw error
        }
    }

    async emailConfirmation(email, token){
        try {

            const messageOpt = {
                from: "coderhouse43400",
                to: 'jesusg0113@gmail.com',
                subject: "Cambiar contraseña",
                text: "Presiona confirmar para cambiar la contraseña",
                html: `<a href="https:localhost:8080/resetPassword/${token}"><button>Confirmar</button></a>` 
                // attachments: [{ path: __dirname + "/imageEjemplo.jpeg" }],
        
            };
            await transporter.sendMail(messageOpt);
            return true
        
            
        } catch (error) {
            throw error
        }
    }

    async resetPassword(id, obj){

        const {email, newPassword, repeatPassword} = obj;
        const hashPassword = await hashData(newPassword);    

        try {
            const changes = {
                password: hashPassword
            }
            const response = await usersManager.updateUser(id, changes)
            return response;
        } catch (error) {
            throw error
        }
    }

}

export const usersService = new UsersService();