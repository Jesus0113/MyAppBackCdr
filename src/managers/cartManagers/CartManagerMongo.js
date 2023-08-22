import { cartModel } from '../../db/models/cart.model.js';

class CartManagerMongo {
    constructor(path) {
      this.path = path;
    }

    async addCart(obj) {

        try {
          
        } catch (error) {
          return error;        
        }
        
    }

    async getCart() {

        try {
          const findAll = await cartModel.find();
  
        } catch (error) {
          return error;        
        }

    }

    async getCartById(id) {

        try {
          
        } catch (error) {
          return error;
        }

    }

    async addProdCart(idCart, idProd) {

        try {
       
        } catch (error) {
          return error;
          
        }
      }

}