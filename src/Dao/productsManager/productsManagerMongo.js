import { productsModel } from '../models/products.model.js';

class ProductManagerMongo {


  //Agrega un producto
  async addProduct(obj) {

    try {
      const newProduct = await productsModel.create(obj);
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  //Trae todos los products segun los query que pasemos
  async getProducts(objQuery) {

    const { limit=10, page=1, sortPrice, ...query} = objQuery;

    try {

       const result = await productsModel.paginate(query ?? {}, { page:page, limit:limit, sort:{"price":sortPrice}});     
// await console.log(result);
      const info = {
        status: result.totalDocs ? 'Succes' : 'Error',
        count:result.totalDocs,
        payload: result.docs,
        totalPages:result.totalPages,
        prePage: PaginaPrevia,
        nextPage: PaginaSiguiente,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        nextLink: result.nextPage ? `http://localhost:8080/api/carts?page${result.nextPage}`: null,
        prevLink: result.prevPage ? `http://localhost:8080/api/carts?page${result.prevPage}` : null
      }
      await console.log(info ?? 'vacio');


      return info

    } catch (error) {
      return error
    }
  }


  //Obtiene un producto segun su Id
  async getProductById(id) {

    try {
      const findProduct = await productsModel.findById(id);
      return findProduct;
    } catch (error) {
      return error;
    }
  }
  //Obtiene un produco por code
  async getProductOne(cod) {

    try {
      const productFind = await productsModel.findOne({ code: cod });
      return productFind;

    } catch (error) {
      return error
    }
  }

  //Actualiza un producto
  async updateProduct(id, obj) {
    try {
      const updateProduct = await productsModel.updateOne({ _id: id }, { ...obj });
      return updateProduct;
    } catch (error) {
      return error;
    }
  }

  //Elimina un producto
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