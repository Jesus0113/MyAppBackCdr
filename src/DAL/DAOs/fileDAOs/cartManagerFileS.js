import fs from 'fs';



class CartManager {
    constructor(path) {
      this.path = path;
    }
  
     async #newId() {
  
       const cartsPrev = await this.getCart();
       const idReturn = !cartsPrev.length ? 1 : cartsPrev[cartsPrev.length - 1].id + 1;
       return idReturn;
     }
  
    async addCart(obj) {

      try {
        const cartsPrev = await this.getCart();
    
        let id = await this.#newId();

        const cartAdd = { id, products: [] };
        cartsPrev.push(cartAdd);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev));
        return cartAdd;
      } catch (error) {
        return error
      }
    }
  
    async getCart() {

      try {
        if (fs.existsSync(this.path)) {
          const infArchivo = await fs.promises.readFile(this.path, 'utf-8');
          const infReturn = JSON.parse(infArchivo);
          return infReturn;
        } else {
          return [];
        }
      } catch (error) {
        return error;
      }
      
    }

    async getCartById(id) {

      try {
        const cartsPrev = await this.getCart();
        const idCartValidator = cartsPrev.find(c => c.id===id);
        return idCartValidator? idCartValidator : 'Cart not found';
      } catch (error) {
        return error;
      }

    }

    async addProdCart(idCart, idProd) {

      try {
        
        const cartsPrev = await this.getCart();
        const cart = cartsPrev.find(c=>c.id===idCart);
        const prodIndex = cart.products.findIndex(p=>p.id===idProd);
  
        if(prodIndex===-1){
          cart.products.push({id:idProd, quantify:1})
  
        }else{
          cart.products[prodIndex].quantify++;
        }
        await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev));
        return cart;
        
      } catch (error) {
        return error;
        
      }
    }
  
  }


 export default CartManager;