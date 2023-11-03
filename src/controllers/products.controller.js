import { productsService } from "../services/products.service.js";

class ProductsController {

    async findAllProducts() {
        try {
            const allProducts = await productsService.findAllProducts(req.query);
            const products = await allProducts.payload;
            res.render('home', { products });
            //res.status(200).json({ message: "Success", allProducts });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findOneProductById() {
        const { id } = req.params;
        try {
            const product = await productsService.findOneProductById(id);
            res.status(200).json({ message: 'User', product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createOneProduct() {
        try {
            const newProduct = await productsService.createOneProduct(req.body);
            res.status(200).json({ message: 'Product created', newProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct() {
        const { id } = req.params;
        try {
            const productUpdate = await productsService.updateProduct(id, req.body)
            res.status(200).json({ message: 'product update', productUpdate })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProductById() {
        const {id} = req.params;
        try {
            const product = await productsService.deleteProductById(id);
            res.status(200).json({message: "Product deleted", product});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const productsController = new ProductsController();