import CartModel from '../DAO/models/carts.model.js'


class cartServise {
    async getAll() {
        const carts = await CartModel.find({}); /* .populate("products.product") */
        return carts;
    }



    async getOne(cid) {
        const get = CartModel.getCartById(cid).populate("products.product");
        return get;
    }




    async createCart() {
        const newCart = await CartModel.create({});
        if (!newCart) {
            throw new Error("cant create.");
        }
        return newCart;
    }




    async deleteProduct(cid, pid) {

    }



    async deleteCart(cid) {
const deleteCart = await CartModel.findById(cid);
if (deleteCart) {
    deleteCart.products = [];
    await deleteCart.save();
    return deleteCart;
} else {
    console.log("error cannot delete")
}
    }



    async addToCart(postc, postp) {
        const newProduct = await CartModel.addToCart(postc, postp);
        return newProduct;
    }



    async updateCart() {
        const changeCart = await CartModel.add(cid,prod)
    }




    async updateQuantity(cid,pid) {
        const changeQuantity = await CartModel.u(cid,pid)
    }

}

export const CartServise = new cartServise();