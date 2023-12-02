import { cartModel } from '../../mongoDB/models/cart.model.js';
import { productsService } from '../../../services/products.service.js';
import { productsModel } from '../../mongoDB/models/products.model.js';
import BasicMongo from './basicMongo.js';

class CartManagerMongo extends BasicMongo {

  constructor() {
    super(cartModel)
  }

  //Trae cart por ID
  async getCartById(id) {
    try {
     
      const cartById = await cartModel.findById(id).populate('products.product');
      return cartById;

    } catch (error) {
      throw error;
    }
  }

  //Agrega producto al cart indicado
  async addProdCart(idCart, idProd, amount) {

    //si no se pasa cantidad tomara 1, si se pasa tomara la correspondiente
    const quantifyQuery = amount ? +amount : 1;

    try {
      
      const findCart = await this.getCartById(idCart);
      const validatorProd = await findCart.products.find(p => p.product.equals(idProd));
      const product = await productsService.findOneProductById(idProd);      
      await !validatorProd ? findCart.products.push({ product: idProd, quantify: quantifyQuery, total: product.price * quantifyQuery }) : (validatorProd.quantify += quantifyQuery, validatorProd.total = product.price * validatorProd.quantify);
      await findCart.save();
      return findCart
    } catch (error) {
      throw error;
    }
  }

  //Elimina producto de un car disminuye la cantidad
  async deleteProduct(idCart, idProd) {

    try {
      const findCart = await this.getCartById(idCart);
      const validatorProd = await findCart.products.find(p => p.product.equals(idProd));

      if (validatorProd.quantify <= 1) {

         findCart.products = await findCart.products.filter(p => p.product._id != idProd)
        
      } else {
        validatorProd.quantify--
        validatorProd.total-=validatorProd.product.price
      }

      await findCart.save();
      return findCart

    } catch (error) {
      throw error;
    }
  }

  //Elimina arreglo de products en cart
  async deleteCart(id) {
    try {
      const deleteProduct = await cartModel.updateOne({ _id: id }, { $set: { products: [] } });
      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }

  // async getCartPopulate(id) {
  //   try {
  //     const cartById = await cartModel.findById(id)

  //     // .populate('products.product', ['title', 'price']);
  //     const populatedProducts = await Promise.all(
  //       cartById.products.map(async (item) => {
  //         const productInfo = await productsModel.findById(item.product)
  //         // .select('title price'); // Puedes seleccionar solo los campos que necesitas
  //         return {
  //           product: productInfo.toObject(),
  //           quantity: item.quantify,
  //           _id: item._id,
  //         };

  //       })

  //     );

  //     return {
  //       products: populatedProducts
  //     }

  //   } catch (error) {
  //     return error;
  //   }
  // }

}





//Instanciar la clase ************
export const cartsMongo = new CartManagerMongo();