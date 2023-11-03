import { cartModel } from '../../mongoDB/models/cart.model.js';
import BasicMongo from './basicMongo.js';

class CartManagerMongo extends BasicMongo {

  constructor(){
    super(cartModel)
  }

  //Trae cart por ID
  async getCartById(id) {
    try {
      const cartById = await cartModel.findById(id).populate('products.product', ['title', 'price']);
      return cartById;
    } catch (error) {
      return error;
    }
  }

  //Agrega producto al cart indicado
  async addProdCart(idCart, idProd, quantifyQ) {
    //si no se pasa cantidad tomara 1, si se pasa tomara la correspondiente
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
  async deleteCart(id) {
    try {
      const deleteProduct = await cartModel.updateOne({ _id: id }, { $set: { products: [] } });
      return deleteProduct;
    } catch (error) {
      return error;
    }
  }
}

//Instanciar la clase ************
export const cartsMongo = new CartManagerMongo();