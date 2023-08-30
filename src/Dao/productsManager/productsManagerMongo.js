import { productsModel } from '../models/products.model.js';

class ProductManagerMongo {



    async addProduct(obj) {

        try {
          const newProduct = await productsModel.create(obj);
          return newProduct;
        } catch (error) {
          return error;
        }
    }

//Trae todos los products segun los query que pasemos
    async getProducts(obj) {

          

    const { limit, page, sortPrice, ...query } = obj;

    try {
      

      const result = await cartModel.paginate(query, { page, limit, sort: { price: sortPrice } });

      const resultOne = {
        "messag": "Carts",
        "carts": {
          "docs": [],
          "totalDocs": 0,
          "limit": 10,
          "totalPages": 1,
          "page": 1,
          "pagingCounter": 1,
          "hasPrevPage": false,
          "hasNextPage": false,
          "prevPage": null,
          "nextPage": null
        }

      // const info = {
      //   count:result.totalDocs,

      //   payload: result.docs,

      //   totalPages:result.totalPages,

      //   prePage: Pagina previa,

      //   nextPage: Pagina siguiente,

      //   page: Pagina Actual,

      //   hasPrevPage:,

      //   hasNextPage,

      //   nextLink: result.hasNextPage ? `http://localhost:8080/api/carts?page${result.nextPage}`: null,
      //   prevLink: result.hasPrevPage ? `http://localhost:8080/api/carts?page${result.prevPage}` : null
      // }
      //return
    }

    } catch (error) {
      return error;
    }

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

    async getProductOne(cod) {

      try {
        const productFind = await productsModel.findOne({code: cod});
        return productFind;
        
      } catch (error) {
        return error
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