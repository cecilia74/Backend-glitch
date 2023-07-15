import { CartsModel } from "../DAO/models/carts.model.js"
import { ProductsModel } from "../DAO/models/products.model.js";

class cartServise {
    async getAll() {
        const carts = await CartsModel.find({}); /* .populate("products.product") */
        return carts;
    }



    async getOne(cid) {
        const get = CartsModel.getCartById(cid).populate("products.product");
        if (!cart) {
            throw new Error("cart not found.");
        }
        return get;
    }

    async createCart() {
        const newCart = await CartsModel.create({});
        if (!newCart) {
            throw new Error("Cannot create cart");
        }
        return newCart;
    }


    async deleteProduct(cid, pid) {
        try {
            const cart = await CartsModel.findById(cid);
            console.log(cart);
            const productIndex = cart.products.findIndex(
                (p) => p.product.toString() === pid
            );
            console.log(productIndex);
            if (!productIndex === -1) {
                throw new Error("Product not found");
            }
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error removing product from cart");
        }
    }


    async deleteCart(cid) {
        try {
            const deleteCart = await CartsModel.findById(cid);
            if (deleteCart) {
                deleteCart.products = [];
                await deleteCart.save();
                return deleteCart;
            } else {
                console.log("error cannot delete cart")
            }
        } catch (error) {
            throw new Error("Error delete cart");
        }
    }



    async addToCart(cartId, productId) {
        try {
            const findCart = await CartsModel.findById(cartId);
            const product = await ProductsModel.findById(productId);
            if (!findCart) {
                throw new Error("Cart not found");
            }
            if (!product) {
                throw new Error("Product not found");
            }
            findCart.products.push({ product: product._id, quantity: 1 });
            await findCart.save();
            return findCart;
        } catch (error) {
            throw new Error("Error add new product to cart");
        }
    }



    async updateCart(cartId, products) {
        try {
            const updateCart = await CartsModel.findByIdAndUpdate(
                cartId,
                { products },
                { new: true }
            );
            return updateCart;
        } catch (error) {
            throw new Error("Error delete cart");
        }
    }




    async updateQuantity(cid, pid, quantity) {
        try {
            console.log(cid, pid, quantity);
            const cart = await CartsModel.findById(cid);
            const productIndex = cart.products.findIndex(
                (p) => p.product.toString() === pid
            );
            if (productIndex === -1) {
                throw new Error("Product not found in cart");
            }
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            console.log(cart);
            return cart;
        } catch (error) {
            throw new Error("Error delete cart");
        }
    }

}

export const CartServise = new cartServise();