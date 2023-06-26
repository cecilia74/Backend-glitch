import fs from "fs";
import ProductManager from "./ProductManager.js";
const reqProductManager = new ProductManager();

export default class CartManager {
    constructor() {
        this.path = ('./src/data/Cart.json');
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            if (data) {
                this.carts = JSON.parse(data).map((cart) => ({
                    ...cart,
                    products: cart.products || [],
                }));
                return
            }
        } catch (err) {
            console.log(`Cannot read file`);
        }
    }

    async saveCarts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });

        } catch (err) {
            console.log(`Cannot change file`);
            console.log(err)
        }
    }

    async addcart() {
try {
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            products: [],
        };
        this.carts.push(newCart);
        await this.saveCarts();
        return newCart;
} catch (err) {
    console.log(`Cannot create cart`);
    console.log(err)
}

    }

    getCart() {
        return this.carts;

    }

    async getCartById(id) {
        let data = this.loadCarts()
        return data.find((product) => +product.id == +id)
    }

    async addProduct(cartId, prodId) {
        const foundId = this.carts.find((c) => +c.id === +cartId);
        const moreprod = foundId.products.find((prod) => +prod.id === +prodId);

        const manangerprod = reqProductManager.getProductById(prodId);
        if (moreprod) {
            moreprod.quantity++;

        } else {

            foundId.products.push({
                manangerprod,
                quantity: 1,

            });
        }

        this.saveCarts();
console.log("Product added to cart")
    }

    async getProductById(id) {
        const product = await reqProductManager.getProductById(id);
        console.log(product);
        return product;
      }
    
}

// const trial2 = new CartManager();

// trial2.addcart();
// console.log(CartManager)
//         { products: [ ] id:1 }
// { producto: "iddelproducto", quantly: 1 }
// [{products}]