import { cartsService } from "../services/carts.service.js";

class CartsController {

    async findAllCarts() {
        try {
            const carts = await cartsService.findAllCarts();
            res.status(200).json({ messag: 'Carts', carts })

        } catch (error) {
            res.status(401).json({ error });
        }
    }

    async findOneCartById(req, res) {
        const { id } = req.params;
        try {
            const findCart = await cartsService.findOneCartById(id);
            if (findCart) {
                res.render('cartId', { findCart });
            } else {
                res.redirect('/api/products');
            }
            // res.status(200).json({ message: 'Cart', findCart })
        } catch (error) {
            res.status(401).json({ error });
        }
    }

    async createCart(req, res) {
        try {
            const newCart = await cartsService.createCart(req.body);
            res.status(200).json({ message: 'Cart created', newCart })
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async updateCart(req, res) {
        //Se obtienen los id del params
        const { idCart, idProd } = req.params;
        // Pasamos la cantidad por body si se quiere mas de un producto
        const { quantify } = req.body;

        try {
            const addProd = await cartsService.updateCart(idCart, idProd, quantify);
            res.status(200).json({ message: 'Product added', cart: addProd });
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    async deleteProductFromCart(req, res) {

        const { idCart, idProd } = req.params;
        try {
            const deleteProduct = await cartsService.deleteProductFromCart(idCart, idProd);
            res.status(200).json({ message: 'Product deleted', product: deleteProduct });
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    async deleteCartById(req, res) {
        const { idCart } = req.params;
        try {
            const deleteCart = await cartsService.deleteCartById(idCart);
            res.status(200).json({ message: 'Cart deleted', cart: deleteCart });
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}

export const cartsController = new CartsController();