import { productsService } from "../services/products.service.js";

class ProductsController {

    async findAllProducts(req, res) {
        try {
            const allProducts = await productsService.findAllProducts(req.query);
            const products = await allProducts.payload;
            res.render('home', { products });
            //res.status(200).json({ message: "Success", allProducts });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async allProductsAdmin(req, res) {
        // const { user } = req.session.passport
        //  const userdb = await usersManager.findUserById(user);
        const { first_name, email, role } = req.user;

        try {

            const readProducts = await productsService.findAllProducts(req.query);
            const products = await readProducts.payload;
            res.render('products', { products, first_name, role });

            //  if (userdb) {
            //     const nameUser = await userdb.first_name
            //     const rol = await userdb.isAdmin ? 'admin' : 'user'
            //     // const readProducts = await productsMongo.getProducts(req.query);
            //     // const products = await readProducts.payload;
            //     // res.render('products', { products, nameUser, rol });
            //  } else {
            //      res.redirect('/');
            //  }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async realTimeProducts(req, res) {
        // const { email } = req.session;
        // const user = await usersManager.findUser(username);
        const { role } = req.user;
        try {
            const readProducts = await productsService.findAllProducts(req.query);
            const products = await readProducts.payload;
            res.render('realTimeProducts', { products });
            // if (role) {
            //     if (user.isAdmin) {
            //         // const readProducts = await productsMongo.getProducts(req.query);
            //         // const products = await readProducts.payload;
            //         // res.render('realTimeProducts', { products });
            //     } else {
            //         res.redirect('/products')
            //     }
            // } else {
            //     res.redirect('/');
            // }
        } catch (error) {
            res.status(500).json({ error: "Hubo un error al acceder a RealTimeProducts" })
        }
    }

    async findOneProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await productsService.findOneProductById(id);
            res.status(200).json({ message: 'User', product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createOneProduct(req, res) {
        try {
            const newProduct = await productsService.createOneProduct(req.body);
            res.status(200).json({ message: 'Product created', newProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        try {
            const productUpdate = await productsService.updateProduct(id, req.body)
            res.status(200).json({ message: 'product update', productUpdate })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await productsService.deleteProductById(id);
            res.status(200).json({ message: "Product deleted", product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const productsController = new ProductsController();