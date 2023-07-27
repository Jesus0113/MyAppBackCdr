const fs = require('fs');


class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async #newId() {

    const productsPrev = await this.getProducts();
    const idReturn = !productsPrev.length ? 1 : productsPrev[productsPrev.length -1].id +1;
    return idReturn;
  }

  async addProduct(obj) {

    try {

      const productsPrev = await this.getProducts();

      if (!obj.title || !obj.description || !obj.price || !obj.thumbnail || !obj.code || !obj.stock) {
        console.log('All fields are required');
        return;
      }



      let id = await this.#newId();

      productsPrev.push({ ...obj, id });

      await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));

    } catch (error) {
      return error
    }
  }

  async getProducts() {

    try {
      if (fs.existsSync(this.path)) {
        const infArchivo = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(infArchivo)
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
      const idValidator = productsPrev.find(prod => prod.id === Number(id));
      idValidator ? console.log(idValidator) : console.log('Not found');

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

        const findProduct = productsPrev[productIndex];
        productsPrev[productIndex] = { ...findProduct, ...obj };

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



// ******************Test*******************************


async function test() {

  //Instanciar la clase ************
  const newProducts = new ProductManager('products.json');


  //Agregar productos ************

  const courseOne = {

    title: 'NodeJs',
    description: 'programmin course',
    price: 100000,
    thumbnail: 'Sin imagen',
    code: 123,
    stock: 50
  }

  const courseTwo = {

    title: 'React JS',
    description: 'programmin course',
    price: 10000,
    thumbnail: 'Sin imagen',
    code: 456,
    stock: 20
  }

  await newProducts.addProduct(courseOne);
  // await newProducts.addProduct(courseTwo);

  //Obtener productos **********

  // const listProducts = await newProducts.getProducts();
  // console.log(listProducts);

  //Encontrar por id ***********

  // const productId = await newProducts.getProductById(1);
  // console.log(productId);

  // Borrar producto ***********

  // await deleteProduct(2);

}

test();




