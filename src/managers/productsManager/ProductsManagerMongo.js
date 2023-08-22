import { productsModel } from '../../db/models/products.model.js';

class ProductManagerMongo {

    constructor(path) {
      this.path = path;
    }

    async addProduct(obj) {

        try {
          const newProduct = await productsModel.create(obj);
          return newProduct;
        } catch (error) {
          return error;
        }
    }

    async getProducts() {

        try {
          const products = await productsModel.find({});
          return products;
          
        } catch (error) {
          return error
        }
    }

    async getProductById(id) {

        try {
          const findProduct = await productsModel.findById(id);
          return findProduct;      
        } catch (error) {
          return error;
        }
    }

    async updateProduct(id, obj) {
        try {
          const updateProduct = await productsModel.updateOne({_id:id},{...obj});
          return updateProduct;
        } catch (error) {
          return error;
        }
    }

    async deleteProduct(id) {
        try {
          const deleteProduct = await productsModel.findByIdAndDelete(id);
          return deleteProduct;
        } catch (error) {
          return error;
        }
    }
}

  //Instanciar la clase ************
  export const productsMongo = new ProductManagerMongo();