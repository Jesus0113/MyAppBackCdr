import fs from 'fs';

class ProductManager {
    constructor(path) {
      this.path = path;
    }
  
    async #newId() {
  
      const productsPrev = await this.getProducts();
      const idReturn = !productsPrev.length ? 1 : productsPrev[productsPrev.length - 1].id + 1;
      return idReturn;
    }
  
    async addProduct(obj) {
  
      try {
  
        const productsPrev = await this.getProducts();
  
        const codeValidator = productsPrev.find(prod => prod.code === obj.code);
  
        if (codeValidator) {
          return ('repeated code');

        }
  
        let id = await this.#newId();

        const productAdd = { ...obj, id };
        productsPrev.push(productAdd);
        await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));
        return productAdd;
  
      } catch (error) {
        return error
      }
    }
  
    async getProducts() {
  
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
  
    async getProductById(id) {
  
      try {
  
        const productsPrev = await this.getProducts();
        const idValidator = productsPrev.find(prod => prod.id === +id);
        return idValidator ? idValidator : 'Not found';
  
      } catch (error) {
        return error;
      }
  
    }
  
    async updateProduct(id, obj) {
      try {
  
        const productsPrev = await this.getProducts();
        const productIndex = productsPrev.findIndex(p => p.id === id);
        if (productIndex === -1) {
  
          return 'ID no found'
  
        } else {
  
          const findProduct = productsPrev[+productIndex];
          productsPrev[productIndex] = { ...findProduct, ...obj };
          await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));
  
        }
  
      } catch (error) {
        return error
  
      }
  
    }
  
    async deleteProduct(id) {
      try {
  
        const productsPrev = await this.getProducts();
        const afterDelete = productsPrev.filter(prods => prods.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(afterDelete));
  
      } catch (error) {
        return error
      }
    }
  }

  //Instanciar la clase ************
export const newProducts = new ProductManager('./products.json');


