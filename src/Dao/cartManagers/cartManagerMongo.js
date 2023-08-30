import { cartModel } from '../models/cart.model.js';

class CartManagerMongo {

  //Agrega un cart a la BD
  async addCart(obj) {

    try {
      const newCart = await cartModel.create(obj);
      return newCart;

    } catch (error) {
      return error;
    }

  }

  //trae todos los carts en BD
  async getCart() {
    try {
      const findCarts = await cartModel.find({});
      return findCarts;
    } catch (error) {
      return error;
    }
  }

  //Trae cart por ID
  async getCartById(id) {
    try {
      const cartById = await cartModel.findById(id);
      return cartById;
    } catch (error) {
      return error;
    }
  }

  //Agrega producto al cart indicado
  async addProdCart(idCart, idProd, quantifyQ) {

    const quantifyQuery = quantifyQ ? +quantifyQ : 1;

    try {

      const findCart = await this.getCartById(idCart);
      const validatorProd = await findCart.products.find(p => p.product.equals(idProd));
      await validatorProd ? (validatorProd.quantify += quantifyQuery) : findCart.products.push({ product: idProd, quantify: quantifyQ || 1 });
      await findCart.save();
      return findCart

    } catch (error) {
      return error;
    }
  }

  //Elimina producto de un car disminuye la cantidad
  async deleteProduct(idCart, idProd) {

    try {

      const findCart = await this.getCartById(idCart);
      const validatorProd = await findCart.products.find(p => p.product.equals(idProd));

      if (validatorProd.quantify <= 0) {

        findCart.products = await findCart.products.filter(p => p.product != idProd)

      } else {
        validatorProd.quantify--
      }

      await findCart.save();
      return findCart

    } catch (error) {
      return error;
    }
  }

  //Elimina arreglo de products en cart
  async deleteCart({ idCart }) {

    try {
      const deleteProduct = await cartModel.updateOne({ _id: idCart }, { $set: { products: [] } });
      return deleteProduct;

    } catch (error) {
      return error;
    }
  }

}

//Instanciar la clase ************
export const cartsMongo = new CartManagerMongo();