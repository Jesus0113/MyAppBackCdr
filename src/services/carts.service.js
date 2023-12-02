import { cartsMongo } from "../DAL/DAOs/mongoDAOs/cartManagerMongo.js";

class CartsService {

    async findAllCarts() {
        try {
            const response = await cartsMongo.findAll();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findOneCartById(id) {
        try {
            const response = await cartsMongo.getCartById(id);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createCart() {

        const newCart = {
            products: []
        }  
        
        try {
            const response = await cartsMongo.createOne(newCart);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(idCart, idProd, amount) {
        try {
            const response = await cartsMongo.addProdCart(idCart, idProd, amount);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductFromCart(idCart, idProd) {
        try {
            const response = await cartsMongo.deleteProduct(idCart, idProd);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteCartById(id) {
        try {
            const response = await cartsMongo.deleteCart(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const cartsService = new CartsService();