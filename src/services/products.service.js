import { productsMongo } from "../DAL/DAOs/mongoDAOs/productsManagerMongo.js";


class ProductsService {

    async findAllProducts(objQuery) {
        try {
            const response = await productsMongo.findAllProducts(objQuery);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findOneProductById(id) {
        try {
            const response = await productsMongo.findById(id);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createOneProduct(obj) {
        
        try {
            const response = await productsMongo.createOne(obj);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, obj) {
        try {
            const response = await productsMongo.updateProduct(id, obj);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductById(id) {
        try {
            const response = await productsMongo.deleteOne(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const productsService = new ProductsService();