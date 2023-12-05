import { ticketsManager } from "../DAL/DAOs/mongoDAOs/ticketManagerMongo.js";
import { productsService } from '../services/products.service.js'
import { usersService } from '../services/users.service.js'
import { cartsService } from "./carts.service.js";
import UsersDto from "../DAL/DTOs/users.dto.js";
import { hashData } from "../utils.js";


class TicketsService {

    async createOnePurchase(obj, idCart) {

        const { email } = obj;
        const newCode = Math.random().toString(32).substring(2) + Date.now().toString(32);

        try {
            const findCart = await cartsService.findOneCartById(idCart);
            const actCart = await findCart.products.filter(p => p.product.stock >= p.quantify)


            let total = 0;
            actCart.forEach(async p => {

                total += p.total

                const stockAct = p.product.stock - p.quantify
                const restaQuantify = await productsService.updateProduct(p.product._id, { stock: stockAct })


            });

            const newTicket = {
                code: newCode,
                amount: total,
                purchaser: email
            }

            findCart.products = await findCart.products.filter(p => p.product.stock < p.quantify);
            await findCart.save()

            const response = await ticketsManager.createOne(newTicket);
            return response;

        } catch (error) {
            return error
        }
    }


    async findAll() {
        try {
            const response = await ticketsManager.findAllfindAll();
            return response;
        } catch (error) {
            return error;
        }
    }



}

export const ticketsService = new TicketsService();