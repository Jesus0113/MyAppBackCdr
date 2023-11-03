import { cartsMongo } from "../DAL/DAOs/mongoDAOs/cartManagerMongo.js";

class CartsService {

    async findAllCarts() {
        try {
            const response = await cartsMongo.findAll();
            return response;
        } catch (error) {
            return error;
        }
    }

    async findOneCartById(id) {
        try {
            const response = await cartsMongo.findById(id);
            return response;
        } catch (error) {
            return error;
        }
    }

    async createCart(obj) {
        try {
            const response = await cartsMongo.createOne(obj);
            return response;
        } catch (error) {
            return error;
        }
    }

    async updateCart(idCart, idProd, quantifyQ) {
        try {
            const response = await cartsMongo.addProdCart(idCart, idProd, quantifyQ);
            return response;
        } catch (error) {
            return error;
        }
    }

    async deleteProductFromCart(idCart, idProd) {
        try {
            const response = await cartsMongo.deleteProduct(idCart, idProd);
            return response;
        } catch (error) {
            return error;
        }
    }

    async deleteCartById(id) {
        try {
            const response = await cartsMongo.deleteCart(id);
            return response;
        } catch (error) {
            return error;
        }
    }
}

export const cartsService = new CartsService();